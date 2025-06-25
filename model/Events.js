const mysql = require("mysql");
const dbConfig = require("../config/mysql.config");
class Event {
    constructor() {
        this.db = mysql.createConnection(dbConfig.db);
        this.db.connect(err => {
            if (err) throw err;
            console.log("Connected to the database (Event)!");
        });
    }

    all(callback) {
        const query = "SELECT id_event, nama_event, lokasi, biaya_regis, peserta_maks, deadline_regis FROM event";
        this.db.query(query, (err, results,fields) => {
            if (err) throw err;
            const events = results.map(result => ({
                id_event: result.id_event,
                nama_event: result.nama_event,
                lokasi: result.lokasi,
                biaya_regis : result.biaya_regis,
                peserta_maks : result.peserta_maks,
                deadline_regis : result.deadline_regis
            }));
            this.db.end(); // Tutup koneksi
            callback(events);
        });
    }

    save(event, detail, callback) {
        const eventQuery = "INSERT INTO event (id_event, nama_event, lokasi, id_kegiatan, biaya_regis, peserta_maks, poster, deadline_regis VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const eventValues = [
            event.id_event,
            event.nama_event,
            event.lokasi,
            event.id_kegiatan,
            event.biaya_regis,
            event.peserta_maks,
            event.deadline_regis
        ];

        this.db.query(eventQuery, eventValues, (err, results) => {
            if (err) return callback(err);

            const detailQuery = `
                INSERT INTO event_detail (id_event_detail, tanggal, waktu_pelaksanaan, waktu_selesai, narasumber, id_event, id_kegiatan)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const detailValues = [
                detail.id_event_detail,
                detail.tanggal,
                detail.waktu_pelaksanaan,
                detail.waktu_selesai,
                detail.narasumber,
                detail.id_event,
                detail.id_kegiatan
            ];

            this.db.query(detailQuery, detailValues, (err2, results2) => {
                if (err2) return callback(err2);
                this.db.end(); // Tutup koneksi
                callback(null, { eventId: results.insertId });
            });
        });
    }
}

module.exports = Event;
