import React from 'react';

import axios from 'axios';
// import {Link} from 'react-router-dom';
// import mkFhir from 'fhir.js';
import $ from 'jquery'; 



export default class Links extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      posts: [],
      patients:[],
      selfPage: null,
      nextPage: null,
      prevPage: null,
      isLoading: false

    }
    this.handleChange = this.handleChange.bind(this)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
  }

  componentDidMount() {
    
    if (this.props.location.state !== undefined) {
      this.setState({
        item: this.props.location.state.item
      })
    }
    
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      this.setState({posts: res.data})
    })
    .catch(err => {
      this.setState({
        error: err
      })
    })

    this.setState({isLoading: true});
    // axios.get('http://localhost:8080/patient2/api/patients')
    axios.get('https://newag-app.herokuapp.com/api/termine')
    .then(res => {
      this.setState({
        patients: res.data,
        isLoading: false
      })
    })
    .catch(err => {
      this.setState({
        error: err
      })
    })
    // var client = mkFhir({
    //   baseUrl: 'http://hapi.fhir.org/baseDstu3'
    // });
    // client.search({type: 'Patient', query: { 'gender': 'female', 'deceased': 'false', 'active': 'true'}})
    //   .then(res => {
    //     this.setState({
    //       patients: res.data.entry,
    //       selfPage: res.data.link[0].url,
    //       nextPage: res.data.link[1].url,
    //       isLoading: false
    //     })
    //   })
    //   .catch(err => console.log(err))
  }

  handleChange(event){
    this.setState({
        item: event.target.value
    })

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
  onSubmit(e) {
    e.preventDefault();
    const vorname =  this.refs.vorname.value.trim();
    const nachname =  this.refs.nachname.value.trim();
    const diagnose =  this.refs.diagnose.value.trim();
    const datum =  this.refs.datum.value.trim();

    // console.log(vorname, nachname, diagnose, datum);
    axios.post('http://localhost:8080/patient2/api/patients', {
      vorname,
      nachname,
      diagnose,
      datum
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))

    $(document).ready(function(){
      $('#terminModal').modal({
        focus: false,
        show: false
      })
    });

    e.preventDefault();
  }
  render(){
    var Spinner = require('react-spinkit');
    const {isLoading} = this.state;

    if (isLoading) {
      return  <Spinner name='ball-grid-pulse' className="spinner" color="#00CED1" />;
    }
      return (
        <div className="container">
          <h2>FHIR-Patienten</h2>
         {/* Button zum Auslösen des Modals */}
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#terminModal">
            Termin erstellen
          </button>
          {/* <p>{this.state.nextPage}</p>
          <p>{this.state.prevPage}</p> */}
          <input value={this.state.item} onChange={this.handleChange}/>
          {this.state.item !== undefined ? this.state.item : undefined}
          {this.state.prevPage ? <button value={this.state.prevPage} onClick={this.prev}>previous</button> : <button disabled>previous</button>}
          {this.state.nextPage ? <button value={this.state.nextPage} onClick={this.next}>next</button> : <button disabled>next</button>}
          <ul className="list-group">
            {this.state.patients.map(patient =>
              <li className="list-group-item" key={patient.id}>{patient.id}, {patient.name}</li>
            )}
          </ul>
          <ul>
            {this.state.posts.map(post =>
              <li key={post.id}>{post.id}{post.title}</li>
            )}
          </ul>

          <div className="modal fade" id="terminModal" tabIndex="-1" role="dialog" aria-labelledby="terminModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="terminModalLabel">Termin anlegen</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                      <label htmlFor="vorname">Vorname</label>
                      <input type="text" className="form-control" ref="vorname" placeholder="Vornamen eingeben" required/>
                      
                    </div>
                    <div className="form-group">
                      <label htmlFor="nachname">Nachname</label>
                      <input type="text" className="form-control" ref="nachname" placeholder="Nachnamen eingeben" required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="diagnose">Beschwerden</label>
                      <input type="text" className="form-control" ref="diagnose" placeholder="Beschwerde/n angeben" required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="datum">Beschwerden</label>
                      <input type="date" className="form-control" ref="datum" placeholder="Datum auswählen" required/>
                    </div>
                    
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">anlegen</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">abbrechen</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      );
    }
  }