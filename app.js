// Packaged Middleware
const express = require('express');
const app = express();
const path = require('path');
const port = 3001;
const bodyParser = require('body-parser');

const routes = require('./routes');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tovia',
  password: 'tovia',
  database: 'toviaenigma'
});

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//serve files from react-app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', routes);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });


//START SERVER
app.listen(port, (err) => {
    if (err) {
        return console.log(`something failed`);
    }
    console.log(`app listening on port ${port}`);
});
