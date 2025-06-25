const User = require('../Model/User');

const index = (req, res) => {
    const user = new User();
    user.all((err, users) => {
        if (err) {
            return res.render('user/user', {
                staffKeuangan: [],
                staffKegiatan: [],
                error: 'Gagal mengambil data user',
            });
        }

        const staffKeuangan = users.filter(u => u.id_role === 2);
        const staffKegiatan = users.filter(u => u.id_role === 3);

        res.render('user/user', {
            staffKeuangan,
            staffKegiatan
        });
    });
};

/**
 * GET /users/create
 * Tampilkan form tambah user
 */
const create = (req, res) => {
    res.render(
        'user/create'
    );
}

/**
 * POST /users
 * Simpan user baru ke database
 */
const store = (req, res) => {
  const userBaru = new User();

  userBaru.save(
    {      
      nama    : req.body.nama,
      email   : req.body.email,
      password: req.body.password,      // pertimbangkan hashing
      no_hp   : req.body.no_hp,
      id_role : req.body.id_role,
    },
    (err, resultId) => {
      if (err) {
        console.log(err)
        // kirim balik ke form dengan pesan error
        return res.render('user/create', {
          error: 'Gagal menyimpan user. Silakan coba lagi.',
          
        });
      }

      console.log('User berhasil disimpan dengan ID:', resultId);
      res.redirect('/user');           // arahkan kembali ke daftar user
    },
  );
};

module.exports = {
  index,
  create,
  store,
};
