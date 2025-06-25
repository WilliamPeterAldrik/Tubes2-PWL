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
router.get('/user/edit/:id', userController.edit);      // Form edit user
router.post('/user/update/:id', userController.update);  // Proses update user
router.get('/user/delete/:id', userController.destroy);


// // go to events page after member login
// router.get("/events", (req, res) => {
//     res.render('events/events');
// })
router.get('events/manage', eventsController.manage); // go to manage events page
router.get('/events', eventsController.index)
router.get('/events/edit/:id', eventsController.edit);      // Form edit event
router.post('/events/update/:id', eventsController.update);  // Proses update event
router.get('/events/create', eventsController.create);
router.post('/events/create', eventsController.store);
router.get('/events/delete/:id', eventsController.destroy);

// go to event register page
router.get("/eventRegis", (req, res) => {
    res.render('eventRegis');
})

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