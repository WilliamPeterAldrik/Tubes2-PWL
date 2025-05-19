const express = require('express');
const db = require('./db');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send('Query gagal');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});
