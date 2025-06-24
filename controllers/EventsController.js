const Events = require('../model/Events');// Sesuaikan dengan path model Event-mu

const index = (req, res) => {
    const event = new Events();
    event.all(events => {
        res.render('events/events', { data: events });
    });
};


const create = (req, res) => {
    res.render('events/create'); // Pastikan file Pug `create.pug` ada di folder `views/events`
};

const store = (req, res) => {
    const eventBaru = new Event();
    eventBaru.save({
        id_event: req.body.id_event,
        nama_event: req.body.nama_event,
        lokasi: req.body.lokasi,
        poster: req.body.poster,
        biaya_regis: req.body.biaya_regis,
        peserta_maks: req.body.perserta_maks,
        deadline_regis: req.body.deadline_regis,
    }, (err, resultId) => {
        if (err) {
            return res.render('events/create', {
                error: 'Gagal menyimpan event. Silakan coba lagi.'
            });
        }
        console.log('Event berhasil disimpan dengan ID:', resultId);
        res.redirect('/event'); // Ubah sesuai routing-mu
    });
};

module.exports = {
    index,
    create,
    store
};
