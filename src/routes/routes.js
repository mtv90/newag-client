import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import history from '../history';

import NotFound from '../components/NotFound';

import Hello from '../components/Hello';

import Termine from '../components/Termine';




export default class Routes extends React.Component {
    render () {
      return (
        <Switch>
          <Route exact={true} path="/" component={Hello} />
          <Route exact path="/termine" component={Termine}/>
          <Route path="*" component={NotFound} />
        </Switch>
      )
    }
} 
