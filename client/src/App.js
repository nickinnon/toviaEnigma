import React, { Component } from 'react';
import './App.css';
import {Button} from 'react-toolbox/lib/button/Button';
//import { Button } from 'react-toolbox/lib/button';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      cypher: 'foo',
      msg: 'test'
    }
  }

  getCypherAjax(e){
    //console.log(e);
    fetch('/api/generateCypher')
      .then( res => res.json() )
      .then(cypher => this.setState(cypher)); //add the new cypher to state.
    console.log(this.state);
  }

  encryptAjax(e){
    console.log(this.state.msg)
    fetch('/api/cypher', {
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
  }

  render() {
    console.log(this.state);

    return (
      <section id="app">
        <form id='form' action="" onSubmit={this.handleSubmit}>
          <input name="msg" type="text" value={this.state.msg}></input>
          <input name="cypher" type="text" value={this.state.cypher}></input>
          <h1>Cypher is {this.state.cypher}</h1>
          <Button label="get cypher" onClick={this.getCypherAjax.bind(this)}></Button>
          <Button label="Encrypt" onClick={this.encryptAjax.bind(this)}></Button>
          <Button label="Dencrypt" onClick={this.decryptAjax.bind(this)}></Button>
        </form>
      </section>
    );
  }
}

export default App;
