const db = require('./db');

async function handleRoutes(req, res) {
    const method = req.method;
    const url = req.url;

    

    //  GET ALL ITEMS
    if (method === 'GET' && url === '/items') {
        const items = await db.loadItems();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(items));
        return;
    }

    //  CREATE ITEM (POST)
    if (method === 'POST' && url === '/items') {
        let body = '';
        for await (const chunk of req) { body += chunk; }
        const data = JSON.parse(body);

        const items = await db.loadItems();
        const newItem = { 
            id: Date.now().toString(), 
            name: data.name, 
            price: data.price, 
            size: data.size 
        };

        items.push(newItem);
        await db.saveItems(items);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newItem));
        return;
    }

    
    if (method === 'DELETE' && url.startsWith('/items/')) {
        const id = url.split('/')[2]; 

        let items = await db.loadItems();
        const filteredItems = items.filter(item => item.id !== id);
        
        await db.saveItems(filteredItems);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Item deleted successfully" }));
        return;
    }

    // UPDATE an item 
    if (method === 'PUT' && url.startsWith('/items/')) {
        const id = url.split('/')[2];
        let body = '';
        for await (const chunk of req) { body += chunk; }
        const updates = JSON.parse(body);

        let items = await db.loadItems();
        const index = items.findIndex(item => item.id === id);

        if (index !== -1) {
            
            items[index] = { ...items[index], ...updates }; 
            await db.saveItems(items);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(items[index]));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Item not found" }));
        }
        return;
    }

    
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not Found" }));
}

module.exports = handleRoutes;