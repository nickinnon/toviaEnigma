// Packaged Middleware
const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', routes);

//START SERVER
app.listen(port, (err) => {
    if (err) {
        return console.log(`something failed`);
    }
    console.log(`app listening on port ${port}`);
});
