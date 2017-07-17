// Packaged Middleware
const express = require('express');
const app = express();
const path = require('path');
const port = 3001;
const bodyParser = require('body-parser');

const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//API endpoints
app.use('/', routes);

//START SERVER
app.listen(port, (err) => {
    if (err) {
        return console.log(`something failed`);
    }
    console.log(`api server listening on port ${port}`);
});
