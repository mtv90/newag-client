import React from 'react';
import './App.css';

import Routes from './routes/routes';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      termine:[]
    }
  }
  render(){
    return (
      <div>
        <Header/>
        <Routes/>
      </div>
    );
  }

}

