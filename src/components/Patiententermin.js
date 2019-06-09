import React from 'react';
import Kalender from './Kalender';
import Terminliste from './Terminliste';

export default class Patiententermin extends React.Component{
    constructor(props){
        super(props);
        this.state= {

        }
    }

    render() {
        return (
            <div className="container-fluid">
               <center><h2>Hier entsteht die Patientenansicht!!!</h2></center>
                <div className="row">
                    <div className="col-md-10 kalender">
                        {/* Eigener Kalender erstellen? */}
                    <Kalender/> 
                    </div>
                    <div className="col-md-2">
                        {/* Eigene Terminliste/ Offene Termine anzeigen? */}
                    <Terminliste/>
                    </div>
                </div>
            </div>
        )
    }
}