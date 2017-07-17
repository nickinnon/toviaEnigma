//App Routes
//TODO error handling
const routes = require('express').Router();
const CypherController = require('./../cypherController.js');

// executed every request
routes.use(function(req, res, next) {
    console.log(req.body);
    next();
});

//GET => nothing (for now)
routes.get('/api', (req, res) => {
    res.status(200).json({
        message: 'Connected!'
    });
});

// GET => String: cypher
routes.get('/api/generateCypher', (req, res) => {
    CypherController.generateNewCypher(res);
});

// POST (String: msg, String: cypher) => encrypted string.
routes.post('/api/cypher', (req, res) => {
    const msg = req.body.msg;
    const cypher = req.body.cypher;
    const who = req.body.who;
    const time= req.body.time;

    CypherController.encrypt(res, msg, cypher, who, time);
});

// POST String: msg, String: cypher => String: decyphered string.
routes.post('/api/decypher', (req, res) => {
    const msg = req.body.msg;
    const cypher = req.body.cypher;

    CypherController.decrypt(res, msg, cypher)
});


module.exports = routes;
