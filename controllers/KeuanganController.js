const Keuangan = require('../model/Keuangan');

const index = (req, res) => {
    const keuangan = new Keuangan();
    res.render(
        'keuangan/keuangan',  {
            data : keuangan.all()
        }
    )
}

const create = (req, res) => {
    res.render(
        'keuangan/create'
    )
}

const store = (req, res) => {
    const keuanganBaru = new Keuangan();
    keuanganBaru.save({
        id_keuangan: req.body.id_keuangan,
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password
    })
    res.redirect('/keuangan');
}

module.exports = {index, create, store}