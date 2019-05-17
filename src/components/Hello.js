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
                <h1 className="display-4 mb-4 text-center menu-color">Finde deinen Arzt und vereinbare einen Termin</h1>
                <form onSubmit={this.submit} className="form-group">
                    
                    <input type="search" name="item" onChange={this.handleChange} className="form-control mb-4 col-md-7 mx-auto" placeholder="Namen eingeben" autoFocus required />
                    
                    <div className="text-center">
                    <button type="submit" className="btn btn-secondary">suchen</button> 
                    <button type="button" className="btn btn-secondary ml-4" onClick={this.showAll}>Alle Ärzte</button>
                    </div>
                </form>
            </div>
        </div>
      );
    }
  }