const fs = require('fs/promises');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'items.json');


async function loadItems() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return []; 
    }
}


async function saveItems(itemsList) {
    const text = JSON.stringify(itemsList, null, 2);
    await fs.writeFile(FILE_PATH, text);
}

module.exports = { loadItems, saveItems };