import React from 'react';
import axios from 'axios';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {appointmentGET,appointmentPOST, patientGET} from '../config/endpoints';

export default class Kalender extends React.Component {
    calendarComponentRef = React.createRef()
    constructor(props){
        super(props);
        this.state = {
            patients:[],
            appointments: [],
            isLoading: false,
            calendarWeekends: false,
            calendarEvents: [ // initial event data
                { title: 'Event Now', start: new Date() }
            ]
        }
    }
    componentDidMount() {
      this.setState({isLoading: true});
      axios.get(patientGET)
      .then(res => {
        this.setState({
          patients: res.data,
          isLoading: false
        })
      })
      .catch(err => {console.log(err)})

      // Hole alle Termine aus dem Backend und der DB

      this.setState({isLoading: true});
      axios.get(appointmentGET)
      .then(res => {
        this.setState({
          calendarEvents: res.data._embedded.appointments,
          isLoading: false
        })
      })
      // .then(()=>{
      //   console.log(this.state.calendarEvents)
      // })
      .catch(err => {
        this.setState({
          error: err
        })
      })
    }
    render() {
      var Spinner = require('react-spinkit');
      const {isLoading} = this.state;
  
      if (isLoading) {
        return  <Spinner name='ball-grid-pulse' className="spinner" color="#00CED1" />;
      }
        return (
            <div>
              {/* Button um Wochenende anzuzeigen */}
              {/* <button className="btn btn-sm bg-secondary text-light" onClick={ this.toggleWeekends }>toggle weekends</button> */}
              <button type="button" className="btn btn-sm btn-primary float-right" data-toggle="modal" data-target="#terminModalKalender">
                <span className="fas fa-plus"></span> Termin
              </button>
              <div className="row">
                <h2 className="mx-auto">Mein Patientenplaner</h2>
              </div>
              <FullCalendar 
                defaultView="timeGridWeek"
                minTime= '08:00:00'
                maxTime= '16:00:00'
                header={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                ref={ this.calendarComponentRef }
                weekends={ this.state.calendarWeekends }
                events={ this.state.calendarEvents }
                dateClick={ this.handleDateClick }
              />
              <div className="modal fade" id="terminModalKalender" tabIndex="-1" role="dialog" aria-labelledby="terminModalLabel" aria-hidden="true">
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
                        <div className="form-group">
                          <label htmlFor="date">Datum</label>
                          <input type="datetime-local" className="form-control" ref="date" placeholder="Datum angeben" required/>
                        </div> 
                        <div className="form-group">
                          <label htmlFor="patient">Patienten auswählen</label>
                          <select className="form-control" id="patientid" ref="patient_id">
                            <option>Bitte Patienten auswählen</option>
                            {this.state.patients.map((patient, index) =>
                              <option key={index} value={patient.id}>{patient.id} | {patient.nachname}, {patient.vorname}</option>
                            )}
                          </select>    
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
    //Toggle Funktion um Wochenende anzuzeigen
    // toggleWeekends = () => {
    //     this.setState({ // update a property
    //       calendarWeekends: !this.state.calendarWeekends
    //     })
    // }

    handleDateClick = (arg) => {

          this.setState({  // add new event data
            calendarEvents: this.state.calendarEvents.concat({ // creates a new array
              title: 'New Event',
              start: arg.date,
              allDay: arg.allDay
            })
          })
        console.log(this.state.calendarEvents[0].start)
    }

    onSubmitTermin(e) {
        // e.preventDefault();
        
        const title =  this.refs.title.value.trim();
        const date = this.refs.date.value;
        const start = new Date(date);
        const patient = {
          id: this.refs.patient_id.value.trim()
        }
        
        this.setState({
            calendarEvents: this.state.calendarEvents.concat({
                title: title, 
                start: start
            })
        })
        axios.post(appointmentPOST, {
          title: title,
          patient,
          start
        })
        // .then(res => {
        // })
        .catch(err => {
          this.setState({
            error: err
          })
        })
      }
}