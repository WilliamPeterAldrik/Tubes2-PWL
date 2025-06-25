// router
const path = require('path');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const eventsController = require('../controllers/EventsController');

router.use(express.static('public'));


// // go to admin page after admin login
// router.get("/admin", (req, res) => {
//     res.render('admin/admin');
// })

router.get('/user', userController.index)

router.get('/user/create', userController.create)

router.post('/user/create', userController.store)

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

// go to dashboard admin
router.get("/dashboardAdmin", (req, res) => {
    res.render('dashboardAdmin');
})

// go to dashboard
router.get("/", (req, res) => {
    res.render('dashboard');
})


module.exports = router;