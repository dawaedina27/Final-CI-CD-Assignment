const express = require('express');
const path = require('path');

const app = express();

// serve the static file (html)

app.use(express.static(path.join(__dirname, 'public')));

// explicit root route in case static serving is bypassed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.json({ message: `Hello, ${name}!` });
});

module.exports = app;
