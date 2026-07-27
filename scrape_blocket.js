import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

async function downloadBlocketCar(url, replaceIndex = null, imageLimit = 15) {
    try {
        console.log(`[1/5] Fetching data from: ${url}`);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const html = await res.text();
        const $ = cheerio.load(html);

        console.log(`[2/5] Parsing DOM...`);
        const title = $('h1').first().text().trim();
        const brand = title.split(' ')[1] || 'Unknown Brand';

        const blocketSpecs = {};
        $('dt').each((i, el) => {
            const key = $(el).text().trim();
            const val = $(el).next('dd').text().trim();
            blocketSpecs[key] = val;
        });

        const equipments = [];
        $('.columns-2 li, .columns-3 li').each((i, el) => {
            equipments.push($(el).text().trim());
        });

        const badge = blocketSpecs['Biltyp'] || 'SUV';
        const year = blocketSpecs['Modellår'] || '2019';
        let mileageRaw = blocketSpecs['Miltal'] || '10 000 mil';
        const formattedMileage = mileageRaw.replace(/\s+/g, '\u00A0'); // non-breaking space

        const desc = `Sourced directly from Sweden. Exceptionally maintained ${brand} with a fully documented ${formattedMileage} odometer reading and premium Swedish executive specifications.`;
        
        const rawFuel = blocketSpecs['Drivmedel'] || 'Bensin';
        let fuelType = rawFuel;
        const fl = rawFuel.toLowerCase();
        if (fl.includes('el')) fuelType = 'Electric';
        if (fl.includes('laddhybrid')) fuelType = 'Plug-in Hybrid';
        if (fl.includes('hybrid')) fuelType = 'Hybrid';
        if (fl.includes('diesel')) fuelType = 'Diesel Turbo';
        if (fl.includes('bensin')) fuelType = 'Petrol Turbo';

        const hp = blocketSpecs['Effekt'] || '150 hk';
        const rawTrans = blocketSpecs['Växellåda'] || 'Automat';
        const transmission = rawTrans.toLowerCase().includes('manuell') ? 'Manual' : 'Automatic';
        
        let plate = `SWE-${String(Math.floor(100 + Math.random() * 900))}`;

        console.log(`[3/5] Extracting image URLs...`);
        let rawImageUrls = [];
        const regex = /https:\/\/images\.blocketcdn\.se\/dynamic\/default\/[^"']+/g;
        let match;
        while ((match = regex.exec(html)) !== null) {
            if (!rawImageUrls.includes(match[0])) {
                rawImageUrls.push(match[0]);
            }
        }
        
        if (imageLimit && rawImageUrls.length > imageLimit) {
            rawImageUrls = rawImageUrls.slice(0, imageLimit);
        }

        console.log(`[4/5] Reading /javascript/script.js to update database...`);
        const scriptPath = path.resolve('javascript/script.js');
        if (!fs.existsSync(scriptPath)) throw new Error(`Could not find script.js`);
        
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        const arrayStartMarker = 'const carData = [';
        const arrayStartIdx = scriptContent.indexOf(arrayStartMarker);
        if (arrayStartIdx === -1) throw new Error("Could not find 'const carData = ['");

        let depthMain = 1;
        let arrayEnd = -1;
        const contentStart = arrayStartIdx + arrayStartMarker.length;
        for (let i = contentStart; i < scriptContent.length; i++) {
            if (scriptContent[i] === '[') depthMain++;
            else if (scriptContent[i] === ']') {
                depthMain--;
                if (depthMain === 0) {
                    arrayEnd = i;
                    break;
                }
            }
        }

        if (arrayEnd === -1) throw new Error("Could not find the end of carData array.");

        const arrayStr = scriptContent.substring(contentStart, arrayEnd).trim();

        let depth = 0;
        let objStart = -1;
        const objects = [];
        let insideString = false;
        let stringChar = '';

        for (let i = 0; i < arrayStr.length; i++) {
            const char = arrayStr[i];
            if ((char === '"' || char === "'" || char === '`') && arrayStr[i-1] !== '\\') {
                if (!insideString) {
                    insideString = true;
                    stringChar = char;
                } else if (stringChar === char) {
                    insideString = false;
                }
            }
            if (!insideString) {
                if (char === '{') {
                    if (depth === 0) objStart = i;
                    depth++;
                } else if (char === '}') {
                    depth--;
                    if (depth === 0 && objStart !== -1) {
                        objects.push({ content: arrayStr.substring(objStart, i + 1) });
                        objStart = -1;
                    }
                }
            }
        }

        let newId = "";
        if (replaceIndex !== null) {
            if (replaceIndex > objects.length) throw new Error(`Invalid replace index: ${replaceIndex}`);
            const existingObj = objects[replaceIndex - 1];
            const idMatch = existingObj.content.match(/id:\s*"([^"]+)"/);
            newId = idMatch ? idMatch[1] : `car-${String(replaceIndex).padStart(3, '0')}`;
            const plateMatch = existingObj.content.match(/plate:\s*"([^"]+)"/);
            if (plateMatch) plate = plateMatch[1];
        } else {
            const idRegex = /id:\s*"car-(\d+)"/g;
            let m;
            let maxIdNum = 20;
            while ((m = idRegex.exec(scriptContent)) !== null) {
                const num = parseInt(m[1]);
                if (num > maxIdNum) maxIdNum = num;
            }
            newId = `car-${String(maxIdNum + 1).padStart(3, '0')}`;
        }

        const assetsDir = path.resolve('assets');
        if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

        console.log(`Found ${rawImageUrls.length} image(s). Downloading to /assets...`);
        const downloadedImages = [];
        
        for (let i = 0; i < rawImageUrls.length; i++) {
            const sourceUrl = rawImageUrls[i];
            const indexStr = String(i + 1).padStart(2, '0');
            const destFilename = `${newId}-img-${indexStr}.jpg`;
            const destPath = path.join(assetsDir, destFilename);
            const clientPath = `assets/${destFilename}`;
            
            console.log(` - Downloading image ${i + 1}/${rawImageUrls.length}...`);
            try {
                const imgRes = await fetch(sourceUrl);
                if (imgRes.ok) {
                    const arrayBuffer = await imgRes.arrayBuffer();
                    fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
                    downloadedImages.push(clientPath); 
                }
            } catch (err) {
                console.warn(` Failed to download image ${i + 1} (${err.message})`);
            }
        }

        if (downloadedImages.length === 0) downloadedImages.push("assets/car-025-exterior.jpg");

        const savedImages = {
            exterior: downloadedImages[0] || '',
            interior: downloadedImages[1] || downloadedImages[0] || '',
            cockpit: downloadedImages[2] || downloadedImages[0] || '',
            engine: downloadedImages[3] || downloadedImages[0] || '',
            all: downloadedImages
        };

        const specsString = `{ origin: "Sweden 🇸🇪", type: "${fuelType}", year: "${year}", mileage: "${formattedMileage}", status: "Available", hp: "${hp}", transmission: "${transmission}", plate: "${plate}" }`;
        const formattedAllImages = downloadedImages.map(img => `"${img}"`).join(',\n                ');
        const formattedEquipment = equipments.length > 0 ? `,\n        equipment: ${JSON.stringify(equipments)}` : '';
        
        const formattedEntry = `{\n        id: "${newId}",\n        badge: "${badge}",\n        title: "${title}",\n        desc: "${desc}",\n        images: {\n            exterior: "${savedImages.exterior}",\n            interior: "${savedImages.interior}",\n            cockpit: "${savedImages.cockpit}",\n            engine: "${savedImages.engine}",\n            all: [\n                ${formattedAllImages}\n            ]\n        },\n        specs: ${specsString}${formattedEquipment}\n    }`;

        const objectStrings = objects.map(o => o.content);
        if (replaceIndex !== null) {
            objectStrings[replaceIndex - 1] = formattedEntry;
        } else {
            objectStrings.unshift(formattedEntry);
        }

        const joinedObjects = '\n    ' + objectStrings.map(str => str.trim()).join(',\n    ') + '\n';
        const beforeArray = scriptContent.substring(0, arrayStartIdx + arrayStartMarker.length);
        const afterArray = scriptContent.substring(arrayEnd);
        const finalScriptContent = beforeArray + joinedObjects + afterArray;

        fs.writeFileSync(scriptPath, finalScriptContent, 'utf8');
        
        console.log(`\n🎉 SUCCESS! Added ${title} to the fleet!`);
    } catch (err) {
        console.error(`\n❌ Error during automated sourcing import:`, err.message);
    }
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.log("Usage: node scrape_blocket.js <blocket_url> [replace_index] [image_limit]");
    process.exit(1);
}
const url = args[0];
const replaceIndex = args.length > 1 ? parseInt(args[1], 10) || null : null;
const imageLimit = args.length > 2 ? parseInt(args[2], 10) || 15 : 15;

downloadBlocketCar(url, replaceIndex, imageLimit);
