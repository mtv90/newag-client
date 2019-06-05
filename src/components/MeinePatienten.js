import React from 'react';
import axios from 'axios';
import mkFhir from 'fhir.js';

export default class MeinePatienten extends React.Component {
	constructor(props){
		super(props)
		this.state={
			patients:[],
			selfPage: null,
			nextPage: null,
			prevPage: null
		}
		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
	}
	componentDidMount(){

		axios.get('http://hapi.fhir.org/baseDstu3/Patient')
			.then((res) => {
				console.log(res)
				
			})
			.catch(err => console.log(err))
			var client = mkFhir({
				baseUrl: 'http://141.37.123.37:8080/baseDstu3/'
				
			  });
			  client.search({type: 'Patient', query: { 'gender': 'male'}})
				.then(res => {
				  this.setState({
					patients: res.data.entry,
					selfPage: res.data.link[0].url,
					nextPage: res.data.link[1].url,
					
				  })
				})
				.then(() => {
				  console.log(this.state.patients)
				})
				.catch(err => console.log(err))
	}
	prev(event){
		event.preventDefault();
		let prevUrl
		axios.get(this.state.prevPage)
		.then(res => {
			
			if(res.data.link.length === 2){
			  prevUrl = ''
			}else {
			  prevUrl = res.data.link[2].url
			}
			this.setState({
			  selfPage: res.data.link[0].url,
			  nextPage: res.data.link[1].url,
			  prevPage: prevUrl,
			  patients: res.data.entry
			})
		  
		})
		.catch(err => console.log(err))
	  } 
	  next(event){
		event.preventDefault();
		let nextUrl
		let prevUrl
		axios.get(this.state.nextPage)
		  .then(res => {
			
			if(res.data.link.length === 2 && res.data.link[1].relation === 'previous'){
			  nextUrl = ''
			  prevUrl = res.data.link[1].url
			}else {
			  nextUrl = res.data.link[1].url
			  prevUrl = res.data.link[2].url
			}
			this.setState({
			  selfPage: res.data.link[0].url,
			  nextPage: nextUrl,
			  prevPage: prevUrl,
			  patients: res.data.entry
			})
		  })
		  .catch(err => console.log(err))
		  
	  }
	render(){
		return <div className="container">
			{this.state.prevPage ? <button value={this.state.prevPage} onClick={this.prev}>previous</button> : <button disabled>previous</button>}
          {this.state.nextPage ? <button value={this.state.nextPage} onClick={this.next}>next</button> : <button disabled>next</button>}
          <ul>
            {this.state.patients.map(patient => <li key={patient.resource.id}>{patient.resource.id} | {patient.resource.name[0].family}, {patient.resource.name[0].given[0]} ({patient.resource.birthDate})</li>)}
          </ul>
		</div>
	}
}
