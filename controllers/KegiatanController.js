const Kegiatan = require('../model/Kegiatan');

const index = (req, res) => {
    const kegiatan = new Kegiatan();
    res.render(
        'kegiatan/kegiatan',  {
            data : kegiatan.all()
        }
    )
}

const create = (req, res) => {
    res.render(
        'kegiatan/create'
    )
}

const store = (req, res) => {
    const kegiatanBaru = new Kegiatan();
    kegiatanBaru.save({
        id_kegiatan: req.body.id_kegiatan,
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password
    })
    res.redirect('/kegiatan');
}

module.exports = {index, create, store}