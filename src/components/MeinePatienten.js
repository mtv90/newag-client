import React from 'react';
import axios from 'axios';
import mkFhir from 'fhir.js';

export default class MeinePatienten extends React.Component {
	constructor(props){
		super(props)
		this.state={
			patienten:[],
			selfPage: null,
			nextPage: null,
			prevPage: null
		}
		//this.prev = this.prev.bind(this);
		//this.next = this.next.bind(this);
	}
	componentDidMound(){
		
		var client = mkFhir({
			baseUrl: 'http://141.37.123.37:8080/baseDstu3/'
		});
		client.search({type: 'Patient', query:{'gender': 'male'}})
			.then( response => {
				console.log(response)
			})
			.catch( error => console.log(error))
	}
	render(){
		return <h1>Hallo</h1>
	}
}
