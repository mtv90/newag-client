import React from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      termine:[]
    }
  }
  componentDidMount(){
    Axios.get('https://newag-app.herokuapp.com/api/termins')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

}

