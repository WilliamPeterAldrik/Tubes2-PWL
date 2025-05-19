const path = require('path');

const express = require('express');

const router = express.Router();

// go to kegiatan page after kegiatan login
router.post("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", ".html"));
})

// go to keuangan page after tim keuangan login
router.post("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", ".html"));
})

// go to admin page after admin login
router.post("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "admin.html"));
})

// go to events page after member login
router.post("/events", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "services.html"));
})

// go to register page
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "singup.html"));
})

// go to login page
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "login.html"));
})

// go to dashboard
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "index.html"));
})


module.exports = router;