import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import history from '../history';

import NotFound from '../components/NotFound';

import Hello from '../components/Hello';

import Termine from '../components/Termine';
import Patiententermin from '../components/Patiententermin';
import MeinePatienten from '../components/MeinePatienten';
import Patient from '../components/Patient';

export default class Routes extends React.Component {
    render () {
      return (
        <Switch>
          <Route exact={true} path="/" component={Hello} />
          <Route exact path="/termine" component={Termine}/>
          <Route exact path="/meinepatienten" component={MeinePatienten}/>
          <Route exact path="/meinepatienten/:patienten_id" component={Patient}/>
          <Route exact path="/patiententermin" component={Patiententermin}/>
          <Route path="*" component={NotFound} />
        </Switch>
      )
    }
} 
