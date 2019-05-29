import React from 'react';
import axios from 'axios';
import {patientGET, patientPOST} from '../config/endpoints';

export default class Patientenliste extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            patients:[],
            patientGET,
            patientPOST
        }
    }

    componentDidMount(){
        this.setState({isLoading: true});
        axios.get(patientGET)
        // "http://localhost:8080/patient2/api/patients"
        // axios.get('https://newag-app.herokuapp.com/api/termine')  
        .then(res => {
          this.setState({
            patients: res.data._embedded.patients,
            isLoading: false
          })
        })
        .catch(err => {
          this.setState({
            error: err
          })
        })
    }

    onSubmitPatient(e) {
        e.preventDefault();
        
         const vorname =  this.refs.vorname.value.trim();
         const nachname =  this.refs.nachname.value.trim();
         const diagnose =  this.refs.diagnose.value.trim();
        const appointment =  this.refs.appointment.value.trim();
        
        console.log(appointment)
    
        axios.post(patientPOST, {
            // 'http://localhost:8080/patient2/patients'
          appointment,
          vorname: vorname,
          nachname: nachname,
          diagnose: diagnose
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }
      render() {
        var Spinner = require('react-spinkit');
        const {isLoading} = this.state;
    
        if (isLoading) {
          return  <Spinner name='ball-grid-pulse' className="spinner" color="#00CED1" />;
        }
        return(
            <div className="mb-4">
                  {/* <div className="row border float-right"> */}
                    {/* <div className="mb-4"> */}
                        <button type="button" className="btn btn-sm btn-primary float-right" data-toggle="modal" data-target="#patientModal">
                        <span className="fas fa-plus"></span> Patienten
                        </button>
                    {/* </div> */}
                {/* </div> */}
                <h3>Meine Patienten</h3>
                <ul className="list-group">
                    {this.state.patients.map(patient =>
                        <li className="list-group-item" key={patient.id}>{patient.id} | {patient.nachname}, {patient.vorname}</li>
                    )}
              </ul>
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
                                    <div className="form-group">
                                        <label htmlFor="appointment">Termin</label>
                                        <input type="text" className="form-control" ref="appointment" placeholder="Termin angeben" />
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