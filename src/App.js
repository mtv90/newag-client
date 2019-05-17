import React from 'react';
import './App.css';

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

