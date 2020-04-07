const http = require('http');

const app = require('./app');

const environ = require('dotenv');
environ.config({path:'./.env'});

const port = process.env.PORT || 3000;
console.log('Server is listening on port ', port);

const server = http.createServer(app);


server.listen(port);
console.log('Server Started ');
console.log(process.env.PORT)
console.log(process.env.JWT_KEY)