import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import history from '../history';
import Signup from '../components/Signup';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Termine from '../components/Termine';
import Hello from '../components/Hello';
import Dashboard from '../components/Dashboard';
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

// const isLoggedIn = () => {
//     if(Meteor.userId()){
//       return true
//     }else {
//       return false
//     }
//   }

export default class Routes extends React.Component {
    render () {
        return (
            <Switch>
                <Route exact={true} path="/" component={Hello} />
                <Route path="/signup" component={Signup}
                    // render={ () =>
                    //     !(isLoggedIn()) ? (
                    //         <Signup />
                    //     ) : (
                    //         <Redirect to="/dashboard" />
                    //     )
                    // } 
                />
                <Route path="/login" component={Login}
                    // render={ () =>
                    // !(isLoggedIn()) ? (
                    //     <Login />
                    // ) : (
                    //     <Redirect to="/dashboard" />
                    // )
                    // } 
        
                />
                <Route exact path="/termine" component={Termine}/>
                <Route exact path="/dashboard" component={Dashboard}
                // render={ () =>
                //     isLoggedIn() ? (
                //         <Dashboard />
                //     ) : (
                //         <Redirect to="/login"/>
                //     )
                //     }
                    />
                <Route path="*" component={NotFound} />
              </Switch>
      )
    }
} 
