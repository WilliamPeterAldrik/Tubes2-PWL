// model/Event.js
const mysql = require("mysql");
const dbConfig = require("../config/mysql.config"); // sesuaikan path jika berbeda

class Event {
  constructor() {
    this.db = mysql.createConnection(dbConfig.db);

    this.db.connect((err) => {
      if (err) {
        console.error("Database connection error (User):", err);
        return;
      }
      console.log("Connected to MySQL (User)");
    });
  }

  /* ===========================
        Ambil semua event + detail
        callback(err, arrayEvent)
    ============================*/
  all(callback) {
    this.db.query("SELECT * FROM event", (err, results) => {
      if (err) {
        console.error("Query error:", err);
        return;
      }
      console.log("Hasil query:", results);
    }); // cek apakah data muncul di sini
    const sql = `
        SELECT e.*, d.id_event_detail, d.tanggal, d.waktu_pelaksanaan,
                d.waktu_selesai, d.narasumber
        FROM event e
        JOIN event_detail d ON d.id_event = e.id_event
        ORDER BY e.id_event, d.id_event_detail
        `;

    this.db.query(sql, (err, rows) => {
      if (err) {
        this.db.end();
        return callback(err);
      }

      // susun: satu event memiliki array detail
      const map = {};
      rows.forEach((r) => {
        if (!map[r.id_event]) {
          map[r.id_event] = {
            id_event: r.id_event,
            nama_event: r.nama_event,
            lokasi: r.lokasi,
            poster: r.poster,
            biaya_regis: r.biaya_regis,
            peserta_maks: r.peserta_maks,
            tgl_buka_regis: r.tgl_buka_regis,
            deadline_regis: r.deadline_regis,
            id_user: r.id_user,
            id_role: r.id_role,
            detail: [],
          };
        }
        // kalau ada baris detail
        if (r.id_event_detail) {
          map[r.id_event].detail.push({
            id_event_detail: r.id_event_detail,
            tanggal: r.tanggal,
            waktu_pelaksanaan: r.waktu_pelaksanaan,
            waktu_selesai: r.waktu_selesai,
            narasumber: r.narasumber,
          });
        }
      });

      this.db.end();
      callback(null, Object.values(map));
    });
  }

  /* ===========================
        Ambil satu event by ID
    ============================*/
  findById(id, callback) {
    const sql = `
        SELECT e.*, d.id_event_detail, d.tanggal, d.waktu_pelaksanaan,
                d.waktu_selesai, d.narasumber
        FROM event e
        LEFT JOIN event_detail d ON d.id_event = e.id_event
        WHERE e.id_event = ?
        `;
    this.db.query(sql, [id], (err, rows) => {
      if (err) {
        this.db.end();
        return callback(err);
      }
      if (!rows.length) {
        this.db.end();
        return callback(null, null);
      }

      const ev = rows[0];
      const event = {
        id_event: ev.id_event,
        nama_event: ev.nama_event,
        lokasi: ev.lokasi,
        poster: ev.poster,
        biaya_regis: ev.biaya_regis,
        peserta_maks: ev.peserta_maks,
        tgl_buka_regis: ev.tgl_buka_regis,
        deadline_regis: ev.deadline_regis,
        id_user: ev.id_user,
        id_role: ev.id_role,
        detail: [],
      };

      rows.forEach((r) => {
        if (r.id_event_detail) {
          event.detail.push({
            id_event_detail: r.id_event_detail,
            tanggal: r.tanggal,
            waktu_pelaksanaan: r.waktu_pelaksanaan,
            waktu_selesai: r.waktu_selesai,
            narasumber: r.narasumber,
          });
        }
      });

      this.db.end();
      callback(null, event);
    });
  }

  /* ===========================
        Simpan event + (optional) detail
        eventData : objek event
        detailArr : object ATAU array detail
    ============================*/
  // model/Events.js
  save(eventData, detailArr, callback) {
  const sql = `
    INSERT INTO event 
    (nama_event, lokasi, poster, biaya_regis, peserta_maks, 
    tgl_buka_regis, deadline_regis, id_user, id_role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    eventData.nama_event,
    eventData.lokasi,
    eventData.poster,
    eventData.biaya_regis,
    eventData.peserta_maks,
    eventData.tgl_buka_regis,
    eventData.deadline_regis,
    eventData.id_user,
    eventData.id_role,
  ];

  this.db.query(sql, values, (err, result) => {
    if (err) return callback(err);

    const newEventId = result.insertId;

    // Kalau tidak ada detail -> langsung selesai
    if (!detailArr || (Array.isArray(detailArr) && detailArr.length === 0)) {
      this.db.end();
      return callback(null, newEventId);
    }

    const details = Array.isArray(detailArr) ? detailArr : [detailArr];

    const valuesDetail = details.map((d) => [
      d.tanggal,
      d.waktu_pelaksanaan,
      d.waktu_selesai,
      d.narasumber,
      newEventId, // FK ke event
    ]);

    const sqlDetail = `
      INSERT INTO event_detail
      (tanggal, waktu_pelaksanaan, waktu_selesai, narasumber, id_event)
      VALUES ?
    `;

    this.db.query(sqlDetail, [valuesDetail], (err2) => {
      this.db.end();
      if (err2) return callback(err2);
      callback(null, newEventId);
    });
  });
}


  /* ===========================
        Update event
    ============================*/
  update(id, data, callback) {
    const sql = `
        UPDATE event SET
            nama_event=?, lokasi=?, poster=?, biaya_regis=?, peserta_maks=?,
            tgl_buka_regis=?, deadline_regis=?, id_user=?, id_role=?, UPDATED_AT=NOW()
        WHERE id_event=?
        `;
    const vals = [
      data.nama_event,
      data.lokasi,
      data.poster,
      data.biaya_regis,
      data.peserta_maks,
      data.tgl_buka_regis,
      data.deadline_regis,
      data.id_user,
      data.id_role,
      id,
    ];

    this.db.query(sql, vals, (err, result) => {
      this.db.end();
      if (err) return callback(err);
      callback(null, result.affectedRows);
    });
  }

  /* ===========================
        Hapus event + detail
    ============================*/
  delete(id, callback) {
    const sqlDelDetail = "DELETE FROM event_detail WHERE id_event = ?";
    this.db.query(sqlDelDetail, [id], (err) => {
      if (err) {
        this.db.end();
        return callback(err);
      }

      const sqlDelEvent = "DELETE FROM event WHERE id_event = ?";
      this.db.query(sqlDelEvent, [id], (err2, res2) => {
        this.db.end();
        if (err2) return callback(err2);
        callback(null, res2.affectedRows);
      });
    });
  }
}
module.exports = Event;
