import React from 'react';
import history from '../history'


export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: ''
    }
  }
  onLogout(){
    history.push('/');
  }
  onSubmit(e){
    const studie = this.refs.studie.value.trim();

    e.preventDefault();
  }
  render(){
    return (
      <div className="container border">
        <h2>Dashboard</h2>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <p>Hier entsteht das Dashboard</p>
        <button className="btn btn-default border" onClick={(e)=>this.onLogout(e)}>
            logout
        </button>
        <p>Studie hinzufügen</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="studie" placeholder="Studie"/>
          <button>speichern</button>
        </form>
      </div>
    );
  }
}