const crypto = require('crypto');
const randomString = require('randomstring');
const algorithm = 'aes-256-ctr';

const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "McKinnon12",
  database: "toviaenigma"
});

class CypherController {
    constructor(){
        this.cypherLen = 8;

        //con.query(`INSERT INTO cyphers (cypher, time_generated, expiration_time) VALUES ('foo', 1, 2)`)
    }

    // Returns UnixEpoch time.
    unixEpoch(){
      return Math.floor(new Date() / 1000);
    }

    encrypt(text, cypher) {
        console.log(this.unixEpoch()) // UNIX epoch time
        let cipher = crypto.createCipher(algorithm, cypher);
        let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }

    decrypt(text, cypher) {
        let decipher = crypto.createDecipher(algorithm, cypher);
        let dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }

    generateNewCypher() {
        return randomString.generate(this.cypherLen);
    }
}

module.exports = new CypherController();
