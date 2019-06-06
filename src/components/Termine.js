import React from 'react';
import Kalender from './Kalender';
import Patientenliste from './Patientenliste';
import Terminliste from './Terminliste';


export default class Links extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }

  onSubmit(e){
    e.preventDefault();
    const item = this.refs.suchbegriff.value.trim().toString();
		const date = this.refs.geburtsdatum.value;
    var sonderzeichen = new RegExp("[!?$&|:;,.-_=()+*#^�<>{}%�~]")
    console.log(sonderzeichen.test(item))
		console.log(date);
    if(item){
      if(item.length >=2 && !sonderzeichen.test(item)){
    	  console.log(item)
    	}
    	if(sonderzeichen.test(item)){
    	  console.log("keine Sonderzeichen")
    	}
			if(item.length < 2){
				console.log("zu wenige Zeichen")
			}
    }
  }
  render(){

    var Spinner = require('react-spinkit');
    const {isLoading} = this.state;

    if (isLoading) {
      return  <Spinner name='ball-grid-pulse' className="spinner" color="#00CED1" />;
    }
    return (
      <div className="container-fluid">
        <div className="row mt-4 pt-4">
          <div className="col-md-10 kalender">
            <Kalender/>
          </div>
          <div className="col-md-2">
            {/* <Patientenliste/>
            <hr/> */}
            <Terminliste/>
          </div>
        </div>
      </div>
      );
    }
  }