import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

// Helper to translate Swedish fields to English
function translateFuelType(fuel) {
    if (!fuel) return "Petrol Hybrid";
    const f = fuel.toLowerCase();
    if (f.includes('el/bensin') || f.includes('hybrid')) return "Plug-in Hybrid";
    if (f.includes('bensin') || f.includes('petrol')) return "Petrol Turbo";
    if (f.includes('diesel')) return "Diesel Turbo";
    if (f.includes('el') || f.includes('electric')) return "Electric";
    return fuel;
}

function translateTransmission(trans) {
    if (!trans) return "Automatic";
    const t = trans.toLowerCase();
    if (t.includes('automat')) return "Automatic";
    if (t.includes('manuell')) return "Manual";
    return trans;
}

function getBadge(bodyType, fuelType) {
    const fuel = translateFuelType(fuelType);
    const body = bodyType ? bodyType.toLowerCase() : "";
    
    if (fuel === "Electric") {
        if (body.includes('wagon')) return "Electric Wagon";
        if (body.includes('suv')) return "Electric SUV";
        return "Electric Compact";
    }
    if (fuel === "Plug-in Hybrid") {
        if (body.includes('wagon')) return "Hybrid Estate";
        if (body.includes('suv')) return "Hybrid SUV";
        return "Hybrid Sedan";
    }
    if (body.includes('wagon')) return "Premium Wagon";
    if (body.includes('suv')) return "Premium SUV";
    return "Premium Sedan";
}

async function scrapeCar() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error("Please provide a valid kvd.se car detail page URL.");
        console.error("Usage: node scrape_kvd.js <URL> [replace_index] [image_limit]");
        process.exit(1);
    }
    
    const url = args[0];
    console.log(`Starting Sweden Sourcing Automated Importer...`);
    console.log(`Target URL: ${url}\n`);

    try {
        // 1. Fetch Page
        console.log(`[1/5] Fetching HTML from KVD.se...`);
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7'
            }
        });
        
        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}`);
        }
        
        const html = await res.text();
        const $ = cheerio.load(html);
        
        // 2. Locate JSON-LD Schema
        console.log(`[2/5] Extracting Schema.org metadata...`);
        let vehicleData = null;
        
        $('script[type="application/ld+json"]').each((_, el) => {
            try {
                const data = JSON.parse($(el).html());
                if (data['@type'] === 'Vehicle' || data['@type'] === 'Product' || data['@type'] === 'Car') {
                    vehicleData = data;
                }
            } catch (e) {
                // Ignore parsing errors of other ld+json blocks
            }
        });
        
        if (!vehicleData) {
            throw new Error("Could not find any Schema.org Vehicle or Product metadata inside the page HTML.");
        }
        
        // 3. Extracting and parsing fields
        console.log(`Successfully identified metadata for: ${vehicleData.name}`);
        
        const brand = vehicleData.brand?.name || "Volvo";
        const model = vehicleData.model || "";
        const title = vehicleData.name || `${brand} ${model}`;
        const year = vehicleData.vehicleModelDate || new Date().getFullYear().toString();
        const fuelType = vehicleData.fuelType || "Petrol";
        const transmission = vehicleData.vehicleTransmission || "Automat";
        const bodyType = vehicleData.bodyType || "Sedan";
        const hpVal = vehicleData.vehicleEngine?.enginePower?.value || "150";
        const hp = `${hpVal} hp`;
        
        // Get SEK price and convert to GHS
        const sekPrice = parseFloat(vehicleData.offers?.lowPrice || vehicleData.offers?.highPrice || "150000");
        // Realistic premium conversion factor (e.g. 1.45 to GHS with freight built in, then round to premium 5000 interval)
        const rawGhsPrice = sekPrice * 1.45;
        const basePriceGHS = Math.round((rawGhsPrice + 35000) / 5000) * 5000; // adding freight and rounding
        
        // Find existing database to determine next ID and plate
        const scriptPath = path.resolve('javascript/script.js');
        if (!fs.existsSync(scriptPath)) {
            throw new Error(`Could not find script.js at: ${scriptPath}`);
        }
        
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        
        // Parse the script to extract the carData array bounds and elements
        const carDataHeaderIndex = scriptContent.indexOf('const carData = [');
        if (carDataHeaderIndex === -1) {
            throw new Error("Could not locate 'const carData = [' inside script.js file structure.");
        }
        
        const arrayStart = carDataHeaderIndex + 'const carData = ['.length;
        
        // Match matching ']' bracket for carData array
        let depth = 1;
        let arrayEnd = -1;
        for (let i = arrayStart; i < scriptContent.length; i++) {
            if (scriptContent[i] === '[') depth++;
            else if (scriptContent[i] === ']') {
                depth--;
                if (depth === 0) {
                    arrayEnd = i;
                    break;
                }
            }
        }
        
        if (arrayEnd === -1) {
            throw new Error("Could not find matching closing bracket for carData array");
        }
        
        const arrayString = scriptContent.substring(arrayStart, arrayEnd);
        
        // Parse individual car object strings inside the array
        const objects = [];
        let objDepth = 0;
        let objStart = -1;
        
        for (let i = 0; i < arrayString.length; i++) {
            const char = arrayString[i];
            if (char === '{') {
                if (objDepth === 0) {
                    objStart = i;
                }
                objDepth++;
            } else if (char === '}') {
                objDepth--;
                if (objDepth === 0 && objStart !== -1) {
                    objects.push({
                        startInArray: objStart,
                        endInArray: i + 1,
                        content: arrayString.substring(objStart, i + 1)
                    });
                    objStart = -1;
                }
            }
        }
        
        // Determine mode (Replace or Add) and IDs/Plates
        let replaceIndex = null;
        let imageLimit = 15; // Default limit to prevent downloading excessive images

        if (args.length > 1) {
            const idxParsed = parseInt(args[1], 10);
            if (!isNaN(idxParsed) && idxParsed > 0) {
                replaceIndex = idxParsed;
            } else {
                console.warn(`⚠️ Warning: Second argument "${args[1]}" is not a valid 1-based index. Proceeding with adding a new entry instead.`);
            }
        }
        
        if (args.length > 2) {
            const limitArg = args[2].toLowerCase();
            if (limitArg === 'all' || limitArg === '0' || limitArg === 'none') {
                imageLimit = null; // No limit
            } else {
                const parsedLimit = parseInt(limitArg, 10);
                if (!isNaN(parsedLimit) && parsedLimit > 0) {
                    imageLimit = parsedLimit;
                }
            }
        }
        
        let newId = "";
        let plate = `KVD-${String(Math.floor(100 + Math.random() * 900))}`;
        
        if (replaceIndex !== null) {
            if (replaceIndex > objects.length) {
                throw new Error(`Invalid replace index: ${replaceIndex}. Total cars in database: ${objects.length}. Please specify a 1-based index between 1 and ${objects.length}.`);
            }
            const existingObj = objects[replaceIndex - 1];
            const idMatch = existingObj.content.match(/id:\s*"([^"]+)"/);
            newId = idMatch ? idMatch[1] : `car-${String(replaceIndex).padStart(3, '0')}`;
            
            const plateMatch = existingObj.content.match(/plate:\s*"([^"]+)"/);
            if (plateMatch) {
                plate = plateMatch[1];
            }
            console.log(`[INFO] Replacement mode active for 1-based index ${replaceIndex} (Target Car ID: ${newId}, License Plate: ${plate})`);
            
            // Clean up and delete any local image assets belonging to the replaced vehicle
            const assetsDir = path.resolve('assets');
            const assetPathRegex = /(?:["']\/?assets\/([^"']+)["'])/g;
            let pathMatch;
            const deletedFiles = [];
            while ((pathMatch = assetPathRegex.exec(existingObj.content)) !== null) {
                const filename = pathMatch[1];
                if (filename) {
                    const fullPath = path.join(assetsDir, filename);
                    if (fs.existsSync(fullPath)) {
                        try {
                            fs.unlinkSync(fullPath);
                            deletedFiles.push(filename);
                        } catch (err) {
                            console.warn(`[WARNING] Failed to delete existing asset: ${filename} (${err.message})`);
                        }
                    }
                }
            }
            if (deletedFiles.length > 0) {
                console.log(`[CLEANUP] Deleted old assets of replaced car: ${deletedFiles.join(', ')}`);
            }
        } else {
            // Find highest existing car ID
            const idRegex = /id:\s*"car-(\d+)"/g;
            let match;
            let maxIdNum = 20; // Default to 20 if none found
            while ((match = idRegex.exec(scriptContent)) !== null) {
                const num = parseInt(match[1]);
                if (num > maxIdNum) {
                    maxIdNum = num;
                }
            }
            const nextIdNum = maxIdNum + 1;
            newId = `car-${String(nextIdNum).padStart(3, '0')}`;
            console.log(`[INFO] Add mode active. Generated new Car ID: ${newId}`);
        }
        
        const badge = getBadge(bodyType, fuelType);
        
        // Descriptive Swedish-curated text
        const mileageVal = vehicleData.mileageFromOdometer?.value ? Math.round(parseFloat(vehicleData.mileageFromOdometer.value) / 10) : 10000;
        const formattedMileage = mileageVal.toLocaleString('sv-SE') + " mil";
        const desc = `Sourced directly from Sweden. Exceptionally maintained ${brand} with a fully documented ${formattedMileage} odometer reading and premium Swedish executive specifications.`;

        // 4. Download images (extract as many as possible)
        console.log(`[3/5] Extracting all vehicle images from metadata & HTML...`);
        let rawImageUrls = [];
        
        if (Array.isArray(vehicleData.image)) {
            rawImageUrls = vehicleData.image.map(img => typeof img === 'string' ? img : (img.contentUrl || img.url || '')).filter(Boolean);
        } else if (typeof vehicleData.image === 'string') {
            rawImageUrls = [vehicleData.image];
        } else if (vehicleData.image && typeof vehicleData.image === 'object') {
            const urlStr = vehicleData.image.contentUrl || vehicleData.image.url || '';
            if (urlStr) rawImageUrls = [urlStr];
        }

        // Also search page HTML for additional high-res imgix/kvd image URLs
        const htmlImgMatches = html.match(/https?:\/\/[^"'\s\)]+?\.(?:jpg|jpeg|png|webp)/gi) || [];
        const cdnImages = htmlImgMatches.filter(u => u.includes('kvdbil-images') || u.includes('kvd.se') || u.includes('imgix'));
        cdnImages.forEach(u => {
            if (!rawImageUrls.includes(u)) {
                rawImageUrls.push(u);
            }
        });

        if (rawImageUrls.length === 0) {
            console.warn("No images found in the metadata. Using high-res fallback placeholders.");
            rawImageUrls.push("https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80");
        }
        
        if (imageLimit !== null && rawImageUrls.length > imageLimit) {
            console.log(`[INFO] Limiting scraped images to ${imageLimit} (Found ${rawImageUrls.length} total)`);
            rawImageUrls = rawImageUrls.slice(0, imageLimit);
        }
        
        // Ensure assets directory exists
        const assetsDir = path.resolve('assets');
        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
        }
        
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
                } else {
                    console.warn(` Failed to download image ${i + 1} (HTTP ${imgRes.status})`);
                }
            } catch (err) {
                console.warn(` Failed to download image ${i + 1} (${err.message})`);
            }
        }

        if (downloadedImages.length === 0) {
            downloadedImages.push("assets/car-025-exterior.jpg");
        }

        const savedImages = {
            exterior: downloadedImages[0] || '',
            interior: downloadedImages[1] || downloadedImages[0] || '',
            cockpit: downloadedImages[2] || downloadedImages[0] || '',
            engine: downloadedImages[3] || downloadedImages[0] || '',
            all: downloadedImages
        };
        
        // 5. Constructing the new database item
        const newCarObject = {
            id: newId,
            badge: badge,
            title: title,
            desc: desc,
            images: savedImages,
            specs: {
                origin: "Sweden 🇸🇪",
                type: translateFuelType(fuelType),
                year: year,
                mileage: formattedMileage,
                status: "Available",
                hp: hp,
                transmission: translateTransmission(transmission),
                plate: plate
            },
            basePriceGHS: basePriceGHS
        };
        
        console.log(`[4/5] Formatting database object entry:`);
        console.log(JSON.stringify(newCarObject, null, 4));
        
        // 6. Update script.js
        console.log(`[5/5] Updating /javascript/script.js database...`);
        const objectStrings = objects.map(o => o.content);
        
        const formattedAllImages = downloadedImages.map(img => `"${img}"`).join(',\n            ');

        const formattedEntry = `{\n        id: "${newCarObject.id}",\n        badge: "${newCarObject.badge}",\n        title: "${newCarObject.title}",\n        desc: "${newCarObject.desc}",\n        images: {\n            exterior: "${newCarObject.images.exterior}",\n            interior: "${newCarObject.images.interior}",\n            cockpit: "${newCarObject.images.cockpit}",\n            engine: "${newCarObject.images.engine}",\n            all: [\n                ${formattedAllImages}\n            ]\n        },\n        specs: { origin: "${newCarObject.specs.origin}", type: "${newCarObject.specs.type}", year: "${newCarObject.specs.year}", mileage: "${formattedMileage}", status: "Available", hp: "${newCarObject.specs.hp}", transmission: "${newCarObject.specs.transmission}", plate: "${newCarObject.specs.plate}" },\n        basePriceGHS: ${newCarObject.basePriceGHS}\n    }`;
        
        if (replaceIndex !== null) {
            objectStrings[replaceIndex - 1] = formattedEntry;
        } else {
            objectStrings.unshift(formattedEntry);
        }
        
        const joinedObjects = '\n    ' + objectStrings.map(str => str.trim()).join(',\n    ') + '\n';
        
        const beforeArray = scriptContent.substring(0, arrayStart);
        const afterArray = scriptContent.substring(arrayEnd);
        const finalScriptContent = beforeArray + joinedObjects + afterArray;
        
        fs.writeFileSync(scriptPath, finalScriptContent, 'utf8');
        
        if (replaceIndex !== null) {
            console.log(`\n🎉 SUCCESS! Fleet item at index ${replaceIndex} has been replaced with: ${newCarObject.title}!`);
            console.log(`- Replaced Sourced ID: ${newCarObject.id}`);
            console.log(`- Mapped License Plate: ${newCarObject.specs.plate}`);
            console.log(`- Assigned Showroom Price: GH₵ ${newCarObject.basePriceGHS.toLocaleString()}`);
            console.log(`- Images saved successfully inside /assets/`);
        } else {
            console.log(`\n🎉 SUCCESS! ${newCarObject.title} has been added to the fleet!`);
            console.log(`- Sourced ID: ${newCarObject.id}`);
            console.log(`- Mapped License Plate: ${newCarObject.specs.plate}`);
            console.log(`- Assigned Showroom Price: GH₵ ${newCarObject.basePriceGHS.toLocaleString()}`);
            console.log(`- Images saved successfully inside /assets/`);
        }
        
    } catch (error) {
        console.error(`\n❌ Error during automated sourcing import:`, error.message);
        process.exit(1);
    }
}

scrapeCar();
