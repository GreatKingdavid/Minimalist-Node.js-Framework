const http = require('http');
const handleRoutes = require('./router');

const server = http.createServer((req, res) => {
  
    handleRoutes(req, res);
});

server.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});