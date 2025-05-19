// router node js
const express = require('express');

const app = express();

const myRouter = require('./route/route.js');

app.use(express.urlencoded({ 
    extended: false 
}));

app.use(myRouter);
app.use((req, res) => {
    res.status(404).send(`
        <h1>404 Page Not Found</h1>
        </a href="/">Go Back</a>`)
})

app.listen(8888, () => {
    console.log("Server is running at port 8888");
})