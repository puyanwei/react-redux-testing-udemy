const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');

const app = express();

// App setup
app.use(morgan('combined')); //console logging framework middleware
app.use(bodyParser.json({ type: '*/*' })); //parses incoming requests into json middleware
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on: ${port}`);
