// controllers/EventsController.js
const path = require("path");
const multer = require("multer");
const Event = require("../model/Events");

/* ---------- konfig multer ---------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads/posters"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, unique);
  },
});
const upload = multer({ storage });

const manage = (req, res) => {
  const ev = new Event();
  ev.all((err, events) => {
    if (err) {
      return res.render("events/manage", {
        data: [],
        error: "Gagal mengambil data event",
      });
    }

    res.render("events/manage", { data: events });
  });
};
/* =========================================
    GET /event
    Tampilkan daftar semua event
    ========================================= */
const index = (req, res) => {
  const ev = new Event();
  ev.all((err, events) => {
    if (err) {
      return res.render("events/events", {
        data: [],
        error: "Gagal mengambil data event",
      });
    }

    res.render("events/events", { data: events });
  });
};

const create = (req, res) => {
  res.render("events/create");
};

/* =========================================
    POST /event/store
    Simpan event + detail ke database
    ========================================= */
const store = [
  upload.single("poster"), // middleware multer
  (req, res) => {
    const evModel = new Event();

    const eventData = {
      nama_event: req.body.nama_event,
      lokasi: req.body.lokasi,
      poster: req.file ? req.file.filename : null, // simpan nama file
      biaya_regis: req.body.biaya_regis,
      peserta_maks: req.body.peserta_maks,
      tgl_buka_regis: req.body.tgl_buka_regis,
      deadline_regis: req.body.deadline_regis,
      id_user: [6],
      id_role: [4],
    };

    evModel.save(eventData, null, (err, newId) => {
      if (err) {
        console.error(err);
        return res.render("events/create", { error: "Gagal menyimpan event." });
      }
      console.log("Event tersimpan, ID:", newId);
      res.redirect("/events/manage");
    });
  },
];

/* =========================================
    GET /event/edit/:id
    Tampilkan form edit event
    ========================================= */
const edit = (req, res) => {
  const evModel = new Event();
  const id = req.params.id;

  evModel.findById(id, (err, data) => {
    if (err || !data) {
      return res.render("events/edit", {
        error: "Event tidak ditemukan",
        event: {},
      });
    }

    res.render("events/edit", { event: data });
  });
};

/* =========================================
    POST /event/update/:id
    Update data event
    ========================================= */
const update = (req, res) => {
  const evModel = new Event();
  const id = req.params.id;

  const updated = {
    nama_event: req.body.nama_event,
    lokasi: req.body.lokasi,
    poster: req.body.poster,
    biaya_regis: req.body.biaya_regis,
    peserta_maks: req.body.peserta_maks,
    tgl_buka_regis: req.body.tgl_buka_regis,
    deadline_regis: req.body.deadline_regis,
    id_user: req.body.id_user,
    id_role: req.body.id_role,
  };

  evModel.update(id, updated, (err) => {
    if (err) {
      return res.render("events/edit", {
        error: "Gagal mengupdate data event.",
        event: { ...updated, id_event: id },
      });
    }

    res.redirect("/events");
  });
};

/* =========================================
    GET /event/delete/:id
    Hapus event beserta detail
    ========================================= */
const destroy = (req, res) => {
  const id = req.params.id;
  const evModel = new Event();

  evModel.delete(id, (err) => {
    if (err) {
      console.error("Gagal menghapus event:", err);
      return res.redirect("/event?error=Gagal menghapus event");
    }

    res.redirect("/events");
  });
};

module.exports = {
  index,
  manage,
  create,
  store,
  edit,
  update,
  destroy,
};
