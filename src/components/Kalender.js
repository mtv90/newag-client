import React from 'react';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
export default class Kalender extends React.Component {
    calendarComponentRef = React.createRef()
    constructor(props){
        super(props);
        this.state = {
            calendarWeekends: false,
            calendarEvents: [ // initial event data
                { title: 'Event Now', start: new Date() }
            ]
        }
    }
    
    render() {
        return (
            <div className="container-fluid">
            <button className="btn btn-default bg-dark text-white" onClick={ this.toggleWeekends }>toggle weekends</button>
                <h3>Kalender</h3>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#terminModal">
            Termin TESTanlegen
          </button>
                <FullCalendar
                    defaultView="timeGridWeek"
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
                    <div className="form-group">
                      <label htmlFor="date">Datum</label>
                      <input type="datetime-local" className="form-control" ref="date" placeholder="Datum angeben" required/>
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
    toggleWeekends = () => {
        this.setState({ // update a property
          calendarWeekends: !this.state.calendarWeekends
        })
    }

    handleDateClick = (arg) => {

          this.setState({  // add new event data
            calendarEvents: this.state.calendarEvents.concat({ // creates a new array
              title: 'New Event',
              start: arg.date,
              allDay: arg.allDay
            })
          })
        
    }

    onSubmitTermin(e) {
        e.preventDefault();
    
        const name =  this.refs.title.value.trim();
        const date = this.refs.date.value;
        this.setState({
            calendarEvents: this.state.calendarEvents.concat({
                title: name, 
                start: date
            })
        })
        console.log(name, date);
      }
}