const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "databaseUAS"
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('MySQL Connected...');
  }
});

app.post('/register', (req, res) => {
  const { nama, email, password, no_hp } = req.body;
  if (!nama || !email || !password || !no_hp) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length > 0) {
      return res.status(409).json({ message: 'Email sudah terdaftar' });
    }
    db.query(
      'INSERT INTO users (nama, email, password, no_hp) VALUES (?, ?, ?, ?)',
      [nama, email, password, no_hp],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal mendaftar' });
        res.status(201).json({ message: 'Registrasi berhasil' });
      }
    );
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password harus diisi' });
  }
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) {
      return res.status(401).json({ message: 'Email tidak ditemukan' });
    }
    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Password salah' });
    }
    res.status(200).json({ message: 'Login berhasil', user: { nama: user.nama, email: user.email } });
  });
});

const PORT = 8888;
app.listen(PORT, () => {
  console.log("Server is running at port 8888");
});