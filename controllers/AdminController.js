const Admin = require('../model/Admin');

const index = (req, res) => {
    const admin = new Admin();
    res.render(
        'admin/admin',  {
            data : admin.all()
        }
    )
}

const create = (req, res) => {
    res.render(
        'admin/create'
    )
}

const store = (req, res) => {
    const adminBaru = new Admin();
    adminBaru.save({
        id_admin: req.body.id_admin,
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password
    })
    res.redirect('/admin');
}

module.exports = {index, create, store}