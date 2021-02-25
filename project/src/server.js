const http = require('http');

const routes = require('./routes');
const router = require('./router');

http.createServer((req, res) => {
    router(req, res, routes);

}).listen(3000, () => {
    console.log('Server is listening on port 3000');
});