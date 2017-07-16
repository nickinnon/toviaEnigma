//App Routes
//TODO error handling
const routes = require('express').Router();
const CypherController = require('./../cypherController.js');

// executed every request
routes.use(function(req, res, next) {
    console.log(req.body);
    next();
});

//GET => homepage
// routes.get('*', (req, res) => {
//     res.status(200).json({
//         message: 'Connected!'
//     });
// });

//GET => nothing (for now)
routes.get('/api', (req, res) => {
    res.status(200).json({
        message: 'Connected!foo'
    });
});

// GET => String: cypher
routes.get('/api/generateCypher', (req, res) => {
    res.status(200).json({
        cypher: `${CypherController.generateNewCypher()}`
    });
});

// POST (String: msg, String: cypher) => encrypted string.
routes.post('/api/cypher', (req, res) => {
    const msg = req.body.msg;
    const cypher = req.body.cypher;

    res.status(200).json({
        msg: `${CypherController.encrypt(msg, cypher)}`
    });
});

// POST String: msg, String: cypher => String: decyphered string.
routes.post('/api/decypher', (req, res) => {
    const msg = req.body.msg;
    const cypher = req.body.cypher;

    res.status(200).json({
        msg: `${CypherController.decrypt(msg, cypher)}`
    });
});


module.exports = routes;
