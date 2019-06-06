import React from 'react';
import axios from 'axios';
// import moment from 'moment';
import {patientGET, patientPOST} from '../config/endpoints';

export default class Patientenliste extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            patients:[],
            suchbegriff:'',
            patientGET,
            patientPOST,
            // filteredPatients: []
        }
    }

    componentDidMount(){
        this.setState({isLoading: true});
        axios.get(patientGET)
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
    }

    onSubmitPatient(e) {
        // e.preventDefault();
        
        const vorname =  this.refs.vorname.value.trim();
        const nachname =  this.refs.nachname.value.trim();
        const diagnose =  this.refs.diagnose.value.trim();
        const geburtsdatum = this.refs.geburtsdatum.value;
        
        axios.post(patientPOST, {
          vorname: vorname,
          nachname: nachname,
          diagnose: diagnose,
          geburtsdatum: geburtsdatum
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }
    //   onSubmitSearch(e){
    //       e.preventDefault();
    //       const suchbegriff = this.refs.suchbegriff.value.trim();
          
    //       this.setState({
    //           suchbegriff
    //       })
    //       this.state.patients.map(patient => {
    //           let name = patient.vorname + patient.nachname;
    //           let datum = moment(patient.geburtsdatum).format('DD.MM.YYYY')
    //           if(name.includes(suchbegriff) || datum.includes(suchbegriff)){
    //               let results= [];
    //               this.setState({
    //                   filteredPatients: results.push(patient)
    //               })
    //           }
    //       })
    //       console.log(this.state.filteredPatients)
    //   }
      render() {
        var Spinner = require('react-spinkit');
        const {isLoading} = this.state;
    
        if (isLoading) {
          return  <Spinner name='ball-grid-pulse' className="spinner" color="#00CED1" />;
        }
        return(
            <div className="mb-4">
                {/* <h2 className="mt-4 mb-4 text-center">Patientensuche</h2>
				<form className="form-horizontal" onSubmit={this.onSubmitSearch.bind(this)}>
                    <div className="form-group row">
                   
                        <input className="form-control" type="text" ref="suchbegriff" placeholder="Bitte Namen des Patienten eingeben"/>
                        <button type="submit" className="btn btn-primary">suchen</button>
                    
					</div>
				</form> */}
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
                                        <label htmlFor="geburtsdatum">Geburtsdatum</label>
                                        <input type="date" className="form-control" ref="geburtsdatum" />
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