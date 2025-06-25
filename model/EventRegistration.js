const mysql = require("mysql");
const dbConfig = require("../config/mysql.config");
class EventRegistration {
    constructor() {
        this.db = mysql.createConnection(dbConfig.db);
        this.db.connect(err => {
            if (err) throw err;
            console.log("Connected to the database (EventRegistration)!");
        });
    }

    all(callback) {
        const query = "SELECT id_event_registration, bukti_pembayaran, id_user, id_kehadiran FROM event_registration";
        this.db.query(query, (err, results,fields) => {
            if (err) throw err;
            const eventsRegis = results.map(result => ({
                id_event_registration: result.id_event_registration,
                bukti_pembayaran: result.bukti_pembayaran,
                id_user: result.id_user,
                id_kehadiran: result.id_kehadiran
            }));
            this.db.end(); // Tutup koneksi
            callback(eventsRegis);
        });
    }

    save(eventRegis, callback) {
        const query = "INSERT INTO event_registration (bukti_pembayaran, id_user, id_kehadiran) VALUES (?, ?, ?)";
        const values = [
            eventRegis.bukti_pembayaran,
            eventRegis.id_user,
            eventRegis.id_kehadiran
        ];
        this.db.query(query, values, (err, results) => {
            if (err) return callback(err);
            this.db.end(); // Tutup koneksi
            callback(null, { eventId: results.insertId });
        });
    }
}

module.exports = EventRegistration;