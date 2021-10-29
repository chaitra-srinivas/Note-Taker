const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

// Wildcard route to the homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Note taker app is listening at http://localhost:${PORT}`);
});
