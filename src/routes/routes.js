import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import history from '../history';

import NotFound from '../components/NotFound';
import Links from '../components/Links';
import Hello from '../components/Hello';
import Dashboard from '../components/Dashboard';
import Termine from '../components/Termine';

const unauthPages = ['/signup', '/login', '/links'];
const authPages = ['/dashboard'];


export const onAuthChange = (isAuth) => {
    const pathname = history.location.pathname;
    const isUnAuthPage = unauthPages.includes(pathname);
    const isAuthPage = authPages.includes(pathname);
  
    if(isUnAuthPage && isAuth){
      history.push('/dashboard')
    }
    else if(isAuthPage && !isAuth){
      history.push('/login')
    }
}


export default class Routes extends React.Component {
    render () {
        return (
            <Switch>
                <Route exact={true} path="/" component={Hello} />
                <Route exact path="/links" component={Links}/>
                <Route path="*" component={NotFound} />
              </Switch>
      )
    }
} 
