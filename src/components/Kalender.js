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
}