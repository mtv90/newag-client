import React from 'react';
import './App.css';
import Axios from 'axios';

import Routes from './routes/routes';
import Header from './components/Header';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      termine:[]
    }
  }
  componentDidMount(){
    // Axios.get('https://newag-app.herokuapp.com/api/termins')
    Axios.get('http://localhost:8080/api/getAllPatient')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
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

