const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const apiRoutes = require('./api');

// Static file serving
app.use(express.static(path.join(__dirname, 'build')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Heartbeat
app.get('/ping', function (req, res) {
  console.log('ping!');
  return res.send('pong');
});

// Main web app
app.get('/', function (req, res) {
  console.log('GET /');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// API proxy
app.use('/api', apiRoutes);

let port = process.env.PORT || 8080;
app.listen(port);

console.log(`Serving on port ${port}`);
