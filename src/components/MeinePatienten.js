import React from 'react';
import axios from 'axios';
import mkFhir from 'fhir.js';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default class MeinePatienten extends React.Component {
	constructor(props){
		super(props)
		this.state={
			patients:[],
			selfPage: null,
			nextPage: null,
			prevPage: null,
			isLoading: false,
		}
		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
	}
	componentDidMount(){
		
		var client = mkFhir({
			baseUrl: 'http://141.37.123.37:8080/baseDstu3/'
			});
			// , query: { 'active': 'false'}
		this.setState({isLoading: true});
		client.search({type: 'Patient'})
			.then(res => {
				this.setState({
					patients: res.data.entry,
					selfPage: res.data.link[0].url,
					nextPage: res.data.link[1].url,
					isLoading: false
				  })
			})
			.catch(err => console.log(err))
	}
	prev(event){
		event.preventDefault();
		let prevUrl
		this.setState({isLoading: true});
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
			  patients: res.data.entry,
			  isLoading: false
			})
		  
		})
		.catch(err => console.log(err))
	  } 
	  next(event){
		event.preventDefault();
		let nextUrl
		let prevUrl
		this.setState({isLoading: true});
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
			  patients: res.data.entry,
			  isLoading: false
			})
		  })
		  .catch(err => console.log(err))
		  
	  }
	  onSubmitSearch(e){
		  e.preventDefault();
		const item = this.refs.suchbegriff.value.trim();
		const date = this.refs.geburtsdatum.value.trim();
		console.log(date)
		var client = mkFhir({
			baseUrl: 'http://141.37.123.37:8080/baseDstu3/'
			});
		this.setState({isLoading: true});
	
		client.search({type: 'Patient', query: { 'birthdate': date }})
			.then(res => {
				
				this.setState({
					patients: res.data.entry,
					// selfPage: res.data.link[0].url,
					// nextPage: res.data.link[1].url,
					isLoading: false
				  })
			})
			.catch(err => console.log(err))
	  }
	render(){
		var Spinner = require('react-spinkit');
		const {isLoading} = this.state;
	
		if (isLoading) {
		  return  <Spinner name='ball-grid-pulse' className="spinner" color="#00CED1" />;
		}
		return <div className="container">
			<h2 className="mt-4 mb-4 pt-4 pb-4 text-center">Meine Patienten</h2>
			<hr/>
			<div className="col-md-12 bg-light mb-4">
          		<h4 className="mt-4 mb-4 text-center">Patientensuche</h4>
				<form className="form-horizontal" onSubmit={this.onSubmitSearch.bind(this)}>
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
			<div className="row">
				{this.state.patients.map(patient => <div className="col-md-12 pt-4 pb-4 alert alert-info" key={patient.resource.id}><Link className="text-decoration-none text-dark" to={{pathname:`/meinepatienten/${patient.resource.id}`, state: {userId: patient.resource.id}}}><p className="display-4">{patient.resource.name[0].family}, {patient.resource.name[0].given[0]}</p> Geburtsdatum: {moment(patient.resource.birthDate).format('DD.MM.YYYY')}</Link></div>)}
				<nav className="pagination mb-4 pb-4 mx-auto">
					<div className="page-item">
						{this.state.prevPage ? <button className="page-link" value={this.state.prevPage} onClick={this.prev}>previous</button> : <button className="page-link" disabled>previous</button>}
					</div>
					<div className="page-item">
						{this.state.nextPage ? <button className="page-link" value={this.state.nextPage} onClick={this.next}>next</button> : <button className="page-link" disabled>next</button>}
					</div>
				</nav>
			</div>
		</div>
	}
}
