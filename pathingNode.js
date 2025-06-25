// pathing node js
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const d = url.parse(req.url, true)
    let fileLocation
    switch (d.pathname) {
        case "/":
            fileLocation = "pages/home.pug"
            break;
        case "/dashboard":
            fileLocation = "pages/dashboardAdmin.pug"
            break;
        case "/user":
            fileLocation = "pages/user.pug"
            break;
        case "/events":
            fileLocation = "pages/events.pug"
            break;
        case "/keuangan":
            fileLocation = "pages/keuangan.pug"
            break;
        case "/kegiatan":
            fileLocation = "pages/kegiatan.pug"
            break;
        case "/login":
            fileLocation = "pages/login.pug"
            break;
        case "/register":
            fileLocation = "pages/register.pug"
            break;
        case "/eventRegis":
            fileLocation = "pages/eventRegis.pug"
            break;
        default:
            fileLocation = "pages/home.pug"
    }
})
server.listen(8888, () => {
    console.log("Server run at port 8888")
})