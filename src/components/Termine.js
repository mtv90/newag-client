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
        {/* Button zum Auslösen des Modals */}
        <div className="col-md-12 bg-light">
          <h2 className="mt-4 mb-4 text-center">Patientensuche</h2>
					<form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group row">
              {/* <div className=" mx-auto"> */}
                <input className="form-control col-md-5 mr-1 ml-4" type="text" ref="suchbegriff" placeholder="Bitte Namen des Patienten eingeben"/>
                <input className="form-control col-md-5 mr-1" type="date" ref="geburtsdatum" placeholder="..oder Geburtsdatum eingeben"/>
                <button type="submit" className="btn btn-primary">suchen</button>
              {/* </div> */}
						</div>
					</form>
					<br/>
			  </div>
        <hr/>
        <div className="row">
          <div className="col-md-10 kalender">
            <Kalender/>
          </div>
          <div className="col-md-2">
            <Patientenliste/>
            <hr/>
            <Terminliste/>
          </div>
        </div>
      </div>
      );
    }
  }