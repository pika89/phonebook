// server.js
const express = require('express');
const app = express();
const path = require('path');

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Start the app by listening on the default
// Heroku port
app.use(forceSSL());
app.listen(process.env.PORT || 8080);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist//untitled2/index.html'));
});

