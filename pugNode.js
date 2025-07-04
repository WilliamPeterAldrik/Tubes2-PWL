// pug node js
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', './pages');
app.use(express.static('public'));
app.use('/uploads', express.static('public/uploads'));
const myRouter = require('./route/route.js');

app.use(express.urlencoded({extended: false}));
app.use(myRouter);

const PORT = 8888;
app.listen(PORT, () => {
    console.log("Server is running at port 8888");
});