import React from 'react';
import {Link} from 'react-router-dom';

export default class Signup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: ''
    }

  }
 
  onSubmit(e){
   
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    
    if(password.length < 6) {
      return this.setState({error: 'Das Passwort muss mehr als 6 Zeichen haben.'});
    }

    e.preventDefault();
  }
  render(){
      return (
        <div className="container">
            <h2>Registrieren</h2>
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : undefined}
            
            <form className="card mb-4" onSubmit={this.onSubmit.bind(this)}>
              <div className="card-body p-3">
                {/* <div className="form-group">
                  <label htmlFor="vorname">Vorname</label>
                  <input className="form-control" type="text" name="vorname" required autoFocus/>
                </div>
                <div className="form-group">
                  <label htmlFor="nachname">Nachname</label>
                  <input className="form-control" type="text" name="nachname" required/>
                </div> */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input className="form-control" type="email" name="email" ref="email" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Passwort</label>
                  <input className="form-control" type="password" name="password" ref="password" required/>
                </div>
                {/* <div className="form-group">
                  <label htmlFor="passwordconfirm">Passwort bestätigen</label>
                  <input className="form-control" type="password" name="passwordconfirm" required/>
                </div> */}
                <button className="btn btn-primary" type="submit">registrieren</button>
              </div>
            </form>

            <Link to="/login">Already have an account?</Link>
        </div>
      );
    }
  }