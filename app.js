const express = require('express');
const path = require('path');

const app = express();

// serve the static file (html)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.json({ message: `Hello, ${name}!` });
});

module.exports = app;