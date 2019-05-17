import React from 'react';

import axios from 'axios';
import {Link} from 'react-router-dom';
import mkFhir from 'fhir.js';



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
    var client = mkFhir({
      baseUrl: 'http://hapi.fhir.org/baseDstu3'
    });
    client.search({type: 'Patient', query: { 'gender': 'female', 'deceased': 'false', 'active': 'true'}})
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
  render(){
    var Spinner = require('react-spinkit');
    const {isLoading} = this.state;

    if (isLoading) {
      return  <Spinner name='ball-grid-pulse' className="spinner" color="#00CED1" />;
    }
      return (
        <div className="container">
          <h2>FHIR-Patienten</h2>
          
          {/* <p>{this.state.nextPage}</p>
          <p>{this.state.prevPage}</p> */}
          <input value={this.state.item} onChange={this.handleChange}/>
          {this.state.item !== undefined ? this.state.item : undefined}
          {this.state.prevPage ? <button value={this.state.prevPage} onClick={this.prev}>previous</button> : <button disabled>previous</button>}
          {this.state.nextPage ? <button value={this.state.nextPage} onClick={this.next}>next</button> : <button disabled>next</button>}
          <ul>
            {this.state.patients.map(patient =>
              <li key={patient.resource.id}>{patient.resource.id}, {patient.resource.birthDate}</li>
            )}
          </ul>
          <ul>
            {this.state.posts.map(post =>
              <li key={post.id}>{post.id}{post.title}</li>
            )}
          </ul>
        </div>
      );
    }
  }