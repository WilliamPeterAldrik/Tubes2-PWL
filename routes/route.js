// router
const path = require('path');
const express = require('express');
const router = express.Router();

router.use(express.static('public'));

// go to kegiatan page after tim kegiatan login
router.get("/kegiatan", (req, res) => {
    res.render('kegiatan');
})

// go to keuangan page after tim keuangan login
router.get("/keuangan", (req, res) => {
    res.render('keuangan');
})

// go to admin page after admin login
router.get("/admin", (req, res) => {
    res.render('admin');
})

// go to events page after member login
router.get("/events", (req, res) => {
    res.render('events');
})

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