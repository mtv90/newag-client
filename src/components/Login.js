import React from 'react';
import {Link} from 'react-router-dom';

import history from '../history'

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: ''
    }
  }
  onLogin(e){

    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    history.push('/dashboard')

  }  
  render(){
    return (
      <div className="container">
        <h2>Anmelden</h2>
        {this.state.error ? <p className="text-danger">{this.state.error}</p> : undefined}
        <form className="card mb-4" onSubmit={this.onLogin.bind(this)}>
          <div className="card-body p-3">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input className="form-control" type="email" name="email" ref="email" autoFocus required/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Passwort</label>
              <input className="form-control" type="password" name="password" ref="password" required/>
            </div>
            <button className="btn btn-primary" type="submit">anmelden</button>
          </div>
        </form>
        <Link to="/signup">Have no account?</Link>
      </div>
    );
  }
}