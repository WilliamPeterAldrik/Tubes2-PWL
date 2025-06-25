const Events = require('../model/Events');// Sesuaikan dengan path model Event-mu

const index = (req, res) => {
    const event = new Events();
    event.all(events => {
        res.render('events/events', { data: events });
    });
};


const create = (req, res) => {
    res.render('eventRegis'); // Pastikan file Pug `create.pug` ada di folder `views/events`
};

const store = (req, res) => {
    const eventRegBaru = new EventRegistration();
    eventRegBaru.save({
        id_event_registration: req.body.id_event_registration,
        bukti_pembayaran: req.body.bukti_pembayaran,
        id_user: req.body.id_user,
        id_kehadiran: req.body.id_kehadiran,
    }, (err, resultId) => {
        if (err) {
            return res.render('eventRegis', {
                error: 'Gagal menyimpan event. Silakan coba lagi.'
            });
        }
        console.log('Event berhasil disimpan dengan ID:', resultId);
        res.redirect('/eventRegis'); // Ubah sesuai routing-mu
    });
};

module.exports = {
    index,
    create,
    store
};
