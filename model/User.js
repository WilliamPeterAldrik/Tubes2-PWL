// Model/User.js
const mysql     = require('mysql');
const dbConfig  = require('../config/mysql.config');

class User {
  constructor () {
    this.db = mysql.createConnection(dbConfig.db);
    this.db.connect(err => {
      if (err) throw err;
      console.log('Connected to the database (User)!');
    });
  }

  /**
   * Ambil semua user → callback(error, hasilArray)
   */
  all (callback) {
    const query = `
      SELECT id_user, nama, email, no_hp, id_role, CREATED_AT, UPDATED_AT
      FROM user
    `;
    this.db.query(query, (err, results) => {
      if (err) {
        this.db.end();
        return callback(err);
      }

      const users = results.map(r => ({
        id_user    : r.id_user,
        nama       : r.nama,
        email      : r.email,
        no_hp      : r.no_hp,
        id_role    : r.id_role,
        CREATED_AT : r.CREATED_AT,
        UPDATED_AT : r.UPDATED_AT,
      }));

      this.db.end();                 // tutup koneksi
      callback(null, users);
    });
  }

  /**
   * Simpan user baru → callback(error, { userId })
   * id_user BIASANYA auto-increment; jika PK manual, sertakan di objek `user`.
   */
  save (user, callback) {
    const query = `
      INSERT INTO user (nama, email, password, no_hp, id_role)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      user.nama,
      user.email,
      user.password,   // hash dulu sebelum simpan di produksi!
      user.no_hp,
      user.id_role,
    ];

    this.db.query(query, values, (err, results) => {
      if (err) {
        this.db.end();
        return callback(err);
      }

      this.db.end();               // tutup koneksi
      callback(null, { userId: results.insertId });
    });
  }
}

module.exports = User;
