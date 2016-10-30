const app = require('./app');
const http = require('http');

http.createServer(app).listen(process.env.PORT);
