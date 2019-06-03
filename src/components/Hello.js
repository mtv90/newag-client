import React from 'react';
import history from '../history'
import {appointmentGET} from '../config/endpoints';
export default class Hello extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            item: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.showAll = this.showAll.bind(this)
    }
    // submit(event){
    //     history.push({
    //         pathname: '/links',
    //         state: {
    //             item: this.state.item
    //         }
    //     });
    //     // event.preventDefault();
    // }
    
    handleChange(event){
        this.setState({
            item: event.target.value
        })
    }
    showAll(){
        history.push('/links');
    }
    render(){
      return (
        <div className="container hello">
            <div className="jumbotron bg-dark text-white jum">
                <h1 className="display-3 mb-4 text-center menu-color">Newag Online-Terminbuchung</h1>
                {/* <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                	<label>Name</label>
                	<input type="text" name="suchbegriff" ref="suchbegriff"/>
                </div>
                <button type="submit">Suchen</button>
                </form> */}
             </div>

        </div>
      );
    }
  }