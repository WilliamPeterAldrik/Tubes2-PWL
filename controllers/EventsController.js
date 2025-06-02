const Events = require('../model/Events');

const index = (req, res) => {
    const events = new Events();
    res.render(
        'events/events',  {
            data : events.all()
        }
    )
}

const create = (req, res) => {
    res.render(
        'events/create'
    )
}

const store = (req, res) => {
    const eventsBaru = new Events();
    eventsBaru.save({
        id_event: req.body.id_event,
        nama_event: req.body.nama_event,
        lokasi: req.body.lokasi,
        poster: req.body.poster,
        biaya_regis: req.body.biaya_regis,
        peserta_maks: req.body.peserta_maks,
        deadline_regis: req.body.deadline_regis
    })
    res.redirect('/events');
}

module.exports = {index, create, store}