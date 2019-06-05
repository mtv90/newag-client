import React from 'react';

export default class Patiententermin extends React.Component{
    constructor(props){
        super(props);
        this.state= {

        }
    }

    render() {
        return (
            <div className="container-fluid">
                <h2>Hier entsteht die Patientenansicht!!!</h2>
                <div className="row">
                    <div className="col-md-10 kalender">
                        <p>Kalender-Grid hier</p>
                    </div>
                    <div className="col-md-2">
                        <p>Terminliste hier</p>
                    </div>
                </div>
            </div>
        )
    }
}