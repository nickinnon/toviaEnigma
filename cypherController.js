const crypto = require('crypto');
const randomString = require('randomstring');
const algorithm = 'aes-256-ctr';

class CypherController {
    constructor(){
        this.cypherLen = 8;
    }

    encrypt(text, cypher) {
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
