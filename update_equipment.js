import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
if (args.length < 2) {
    console.log("Usage: node update_equipment.js <file_path> <car_index>");
    process.exit(1);
}

const filePath = args[0];
const carIndex = parseInt(args[1], 10);

if (isNaN(carIndex) || carIndex < 1) {
    console.error("Error: <car_index> must be a valid 1-based integer.");
    process.exit(1);
}

if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found - ${filePath}`);
    process.exit(1);
}

const rawText = fs.readFileSync(filePath, 'utf8');

// Strip and trim all words (split by newlines or commas)
const equipmentList = rawText
    .split(/\r?\n|,/)
    .map(word => word.trim())
    .filter(word => word.length > 0);

console.log(`Parsed ${equipmentList.length} equipment items from ${filePath}.`);

const scriptPath = path.resolve('javascript/script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

const arrayStartMarker = 'const carData = [';
const arrayStart = scriptContent.indexOf(arrayStartMarker);
if (arrayStart === -1) {
    console.error("Error: Could not find 'const carData = [' in script.js");
    process.exit(1);
}

let depthMain = 1;
let arrayEnd = -1;
const contentStart = arrayStart + arrayStartMarker.length;
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

if (arrayEnd === -1) {
    console.error("Error: Could not find the end of carData array.");
    process.exit(1);
}

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
                objects.push({
                    start: objStart,
                    end: i + 1,
                    content: arrayStr.substring(objStart, i + 1)
                });
            }
        }
    }
}

if (carIndex > objects.length) {
    console.error(`Error: Index ${carIndex} is out of bounds. Total cars: ${objects.length}`);
    process.exit(1);
}

const targetObj = objects[carIndex - 1];
let objContent = targetObj.content;

// Update the equipment array, or append it if it doesn't exist
const equipRegex = /equipment:\s*\[[\s\S]*?\]/;
const newEquipStr = `equipment: ${JSON.stringify(equipmentList)}`;

if (equipRegex.test(objContent)) {
    objContent = objContent.replace(equipRegex, newEquipStr);
} else {
    objContent = objContent.replace(/\s*}$/, `,\n        ${newEquipStr}\n    }`);
}

const objectStrings = objects.map(o => o.content);
objectStrings[carIndex - 1] = objContent;

const joinedObjects = '\n    ' + objectStrings.map(str => str.trim()).join(',\n    ') + '\n';

const beforeArray = scriptContent.substring(0, arrayStart + arrayStartMarker.length);
const afterArray = scriptContent.substring(arrayEnd);
const finalScriptContent = beforeArray + joinedObjects + afterArray;

fs.writeFileSync(scriptPath, finalScriptContent, 'utf8');

console.log(`Successfully updated equipment for car at index ${carIndex}.`);
