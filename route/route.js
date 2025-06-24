// router
const path = require('path');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const eventsController = require('../controllers/EventsController');
const kegiatanController = require('../controllers/KegiatanController');
const keuanganController = require('../controllers/KeuanganController');

router.use(express.static('public'));

// go to kegiatan page after tim kegiatan login
// router.get("/kegiatan", (req, res) => {
//     res.render('kegiatan/kegiatan');
// })

router.get('/kegiatan', kegiatanController.index)

router.get('/kegiatan/create', kegiatanController.create)

router.post('/kegiatan/create', kegiatanController.store)

// go to keuangan page after tim keuangan login
// router.get("/keuangan", (req, res) => {
//     res.render('keuangan/keuangan');
// })

router.get('/keuangan', keuanganController.index)

router.get('/keuangan/create', keuanganController.create)

router.post('/keuangan/create', keuanganController.store)

// // go to admin page after admin login
// router.get("/admin", (req, res) => {
//     res.render('admin/admin');
// })

router.get('/admin', adminController.index)

router.get('/admin/create', adminController.create)

router.post('/admin/create', adminController.store)

// // go to events page after member login
// router.get("/events", (req, res) => {
//     res.render('events/events');
// })

router.get('/events', eventsController.index)

router.get('/events/create', eventsController.create)

router.post('/events/create', eventsController.store)

// go to register page
router.get("/register", (req, res) => {
    res.render('register');
})

// go to login page
router.get("/login", (req, res) => {
    res.render('login');
})

// go to dashboard
router.get("/", (req, res) => {
    res.render('dashboard');
})


module.exports = router;