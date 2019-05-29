import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {appointmentGET} from '../config/endpoints';

export default class Terminliste extends React.Component{
    constructor(props){
        super(props);
        this.state={
            appointments: [],
            isLoading: false,
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        axios.get(appointmentGET)
        // 'http://localhost:8080/patient2/appointments'
        // axios.get('https://newag-app.herokuapp.com/patient2/appointments') //Endpoint für Produktiv
        .then(res => {
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
       }

    render() {
        var Spinner = require('react-spinkit');
        const {isLoading} = this.state;
    
        if (isLoading) {
          return  <Spinner name='ball-grid-pulse' className="spinner" color="#00CED1" />;
        }
        return(
            <div className="col-md-12 mb-4">
                <h3>Termine</h3>
                <ul className="list-group">
                    {this.state.appointments.map((termin, index) =>
                        <li className="list-group-item" key={index}>{moment(termin.start).format('dd, DD.MM.YYYY, HH:mm')}: {termin.title}</li>
                    )}
                </ul>
            </div>
        );
    }
}