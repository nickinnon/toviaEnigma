const crypto = require('crypto');
const randomString = require('randomstring');
const algorithm = 'aes-256-ctr';

class CypherController {
    constructor(){
        this.cypherLen = 8;
        // will persist for duration of server's life
        this.ghettoDB = {};

        // Example entry
        // cypher: {
        //   who:''
        //   time_generated:''
        //   expiration_time:''
        // }
    }

    // Returns UnixEpoch time.
    __unixEpoch(date){
      return Math.floor(date / 1000);
    }

    // add an entry to Object: ghettoDB
    __appendDB(cypher, who, expiration_time, time_generated){
      console.log(this.ghettoDB);
      this.ghettoDB[cypher] = {
        'who': who,
        'time_generated': time_generated,
        'expiration_time': expiration_time
      }
    }

    encrypt( res, text, cypher, who, time) {
        const serverTime = this.__unixEpoch(new Date() ) // current UNIX epoch time
        time = typeof time != Number ? Infinity : time;

        //check if the cypher has been used yet
        if(!!this.ghettoDB[cypher]){

          res.status(400).json({
              'msg': `Passphrase not available`
          });

        }else{
          let cipher = crypto.createCipher(algorithm, cypher);
          let crypted = cipher.update(text, 'utf8', 'hex');
          crypted += cipher.final('hex');

          this.__appendDB(cypher, who, time, serverTime);

          res.status(200).json({
            'msg': crypted
          });
        }
    }

    decrypt(res, text, cypher) {
        const serverTime = this.__unixEpoch(new Date())

        //check if the cypher has been used yet
        if(!!this.ghettoDB[cypher]){
          let entry = this.ghettoDB[cypher];

          if(this.ghettoDB[cypher].expiration_time > serverTime){
            let decipher = crypto.createDecipher(algorithm, cypher);
            let dec = decipher.update(text, 'hex', 'utf8');
            dec += decipher.final('utf8');

            // respond with info about the text.
            res.status(200).json({
              'msg': dec,
              'who': entry.who
            });
          }else{
            res.status(400).json({
                'msg': `Passphase not available`
            });
          }
        }
    }

    generateNewCypher(res) {
      res.status(200).json({
          'cypher': randomString.generate(this.cypherLen)
      });
    }
}

module.exports = new CypherController();
