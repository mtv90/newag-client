import React from 'react';

import axios from 'axios';
import Kalender from './Kalender';



export default class Links extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      localpatients: [],
      patients:[],
      appointments: [],
      isLoading: false
    }
  }

  componentDidMount() {

    this.setState({isLoading: true});
    // axios.get('http://localhost:8080/patient2/appointments')
    axios.get('https://newag-app.herokuapp.com/patient2/appointments') //Endpoint für Produktiv
    .then(res => {
      console.log(res.data._embedded)
      this.setState({
        appointments: res.data._embedded.appointments,
        isLoading: false
      })
    })
    .catch(err => {
      this.setState({
        error: err
      })
    })
    // axios.get('http://localhost:8080/patient2/patients')
    // // axios.get('https://newag-app.herokuapp.com/api/termine')
    // .then(res => {
    //   console.log(res.data._embedded.localPatients)
    //   this.setState({
    //     localpatients: res.data._embedded.localPatients,
    //     isLoading: false
    //   })
    // })
    // .catch(err => {
    //   this.setState({
    //     error: err
    //   })
    // })
  //   axios.get('http://localhost:8080/patient2/api/patients')
  //   // axios.get('https://newag-app.herokuapp.com/api/termine')
  //   .then(res => {
  //     this.setState({
  //       patients: res.data,
  //       isLoading: false
  //     })
  //   })
  //   .catch(err => {
  //     this.setState({
  //       error: err
  //     })
  //   })
   }

  onSubmitTermin(e) {
    e.preventDefault();

    const title =  this.refs.title.value.trim();

    axios.post('https://newag-app.herokuapp.com/patient2/appointments', {
      name: title
    })
    .then(res => {

      console.log(res)
    })
    .catch(err => {
      this.setState({
        error: err
      })
    })
    
  }
  onSubmitPatient(e) {
    e.preventDefault();

    
    // const vorname =  this.refs.vorname.value.trim();
    // const nachname =  this.refs.nachname.value.trim();
    // const diagnose =  this.refs.diagnose.value.trim();

    // axios.post('http://localhost:8080/patient2/patienten', {
    //   vorname,
    //   nachname,
    //   diagnose
    // })
    // .then(res => console.log(res))
    // .catch(err => console.log(err))


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
        <div className="mb-4">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#terminModal">
            Termin anlegen
          </button>
          <button type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#patientModal">
            Patienten anlegen
          </button>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Kalender/>
          </div>
          <div className="col-md-4">
            <div className="col-md-12">
              <p>FHIR Patienten</p>
              <ul className="list-group">
                {this.state.patients.map(patient =>
                  <li className="list-group-item" key={patient.id}>{patient.id}, {patient.vorname}</li>
                )}
              </ul>
            </div>
            <div className="col-md-12">
              <p>Lokale Patienten</p>
              <ul className="list-group">
                {this.state.localpatients.map((patient, index) =>
                  <li className="list-group-item" key={index}>{index}, {patient.vorname} {patient.nachname} / {patient.diagnose}</li>
                )}
              </ul>
            </div>
            <div className="col-md-12">
              <p>Termine</p>
              <ul className="list-group">
                {this.state.appointments.map((termin, index) =>
                  <li className="list-group-item" key={index}>{index}, {termin.name}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="modal fade" id="patientModal" tabIndex="-1" role="dialog" aria-labelledby="patientModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="patientModalLabel">Patienten anlegen</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.onSubmitPatient.bind(this)}>
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
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">anlegen</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">abbrechen</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

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
                  <form onSubmit={this.onSubmitTermin.bind(this)}>
                   <div className="form-group">
                      <label htmlFor="title">Terminname</label>
                      <input type="text" className="form-control" ref="title" placeholder="Titel eingeben" required/>
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