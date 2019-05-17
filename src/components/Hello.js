import React from 'react';
import history from '../history'
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
    submit(event){
        history.push({
            pathname: '/links',
            state: {
                item: this.state.item
            }
        });
        // event.preventDefault();
    }
    
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
            <div className="jumbotron shadow">
                <h1 className="display-3 mb-4 text-center menu-color">Newag Online-Termninbuchung</h1>
            </div>
        </div>
      );
    }
  }