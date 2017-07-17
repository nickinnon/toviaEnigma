import React, { Component } from 'react';
import { Card, CardTitle } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import Button from 'react-toolbox/lib/button';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cypher: '',
      msg: '',
      multiline: '',
      name: '',
      date: '',
      minDate: new Date()
    };

    this.getCypherAjax();
  }

  // add a listener for hash changing
  componentDidMount(){
    const self = this;
    window.addEventListener('hashchange', (e) => {
      self.state.cypher = e.newURL.split('#')[1];
    });
  }

  //update hash if state changes
  componentDidUpdate(){
    window.location.hash = this.state.cypher;
  }

  handleChange(name, value){
    this.setState({...this.state, [name]: value});
  }

  getCypherAjax(e){
    fetch('/api/generateCypher')
      .then( res => res.json() )
      .then(cypher => this.setState(cypher)); //add the new cypher to state.
  }

  encryptAjax(e){
    //Nasty check for now. Can probably be handled by server.
    let date = this.state.date === '' ? Infinity :
              Math.floor( Date.parse(this.state.date) / 1000);

    fetch('/api/cypher', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg: this.state.msg,
        cypher: this.state.cypher,
        time: date,
        who: this.state.name
      })
    })
      .then( res => res.json() )
      .then( msg => this.setState(msg) );
      //TODO catch errors
  }

  decryptAjax(e){
    fetch('/api/decypher', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg: this.state.msg,
        cypher: this.state.cypher,
      })
    })
      .then( res => res.json() )
      .then( msg => this.setState(msg));
      //TODO catch errors
  }

  render() {
    console.log(this.state);

    return (
      <section id="app">
        <Card>
          <CardTitle
            title="Tovia's Enigma Engine"
            className="header"
          />
          <div className="content">
            <Input
              name="name"
              label="Name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange.bind(this, 'name')}
            />
            <Input
              name="msg"
              label="Message"
              multiline
              type="text"
              maxLength={500}
              value={this.state.msg}
              onChange={this.handleChange.bind(this, 'msg')}
            />
            <Input
              name="cypher"
              label="Passphrase"
              type="text"
              value={this.state.cypher}
              onChange={this.handleChange.bind(this, 'cypher')}
            />
            <DatePicker
              label='Expiration Date'
              onChange={this.handleChange.bind(this, 'date')}
              value={this.state.date}
              minDate={this.state.minDate}
              sundayFirstDayOfWeek
            />
          </div>
          <div>
            <Button label="Encrypt" onClick={this.encryptAjax.bind(this)}></Button>
            <Button label="Decrypt" onClick={this.decryptAjax.bind(this)}></Button>
          </div>
        </Card>
        <div>
          Your Passphrase - <span>{this.state.cypher}</span>
        </div>
        <a onClick={this.getCypherAjax.bind(this)}>Get New Passphrase</a>
      </section>
    );
  }
}

export default App;
