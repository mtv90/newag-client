import React from 'react';
import axios from 'axios';
// import mkFhir from 'fhir.js';
// import moment from 'moment';

export default class MeinePatienten extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            userId: null,
            isLoading: false,
            active: null,
            strasse:'',
            plz: '',
            stadt:'',
            land:'',
            birthDate:'',
            gender:'',
            nachname:'',
            vorname:'',
            telefon:{},
            festnetz:'',
            email:{},
            generalPractitioner:[],
            practitioner:{},

            patient:{
                userId: null,
                active: null,
                strasse:'',
                plz: '',
                stadt:'',
                land:'',
                birthDate:'',
                gender:'',
                nachname:'',
                vorname:'',
                telefon:{},
                festnetz:'',
                email:{},
                generalPractitioner:[],
            }
        }
    }
    componentDidMount(){

        let userId = this.props.location.state.userId
        if(userId){
            this.setState({userId})
            this.setState({isLoading: true});
            axios.get('http://141.37.123.37:8080/baseDstu3/Patient/'+userId)
                .then(res => {

                    let phone = '';
                    let mail = '';
                    let home = '';
                    
                    if(res.data.telecom.length === 1){
                        if(res.data.telecom[0].system === 'phone' && res.data.telecom[0].use === 'home') {
                            home = res.data.telecom[0].value
                        }
                        if(res.data.telecom[0].system === 'phone' && res.data.telecom[0].use === 'mobile'){
                            phone = res.data.telecom[0].value
                        }
                        if(res.data.telecom[0].system === 'email'){
                            mail = res.data.telecom[0].value
                        }
                        
                    }
                    if(res.data.telecom.length === 2){
                        if(res.data.telecom[0].system === 'phone' && res.data.telecom[0].use === 'home') {
                            home = res.data.telecom[0].value
                        }
                        if(res.data.telecom[0].system === 'phone' && res.data.telecom[0].use === 'mobile') {
                            phone = res.data.telecom[0].value
                        }
                        if(res.data.telecom[1].system === 'phone' && res.data.telecom[1].use === 'mobile') {
                            phone = res.data.telecom[1].value
                        }
                        if(res.data.telecom[1].system === 'email') {
                            mail = res.data.telecom[1].value
                        }
                    }
                    if(res.data.telecom.length === 3){
                        if(res.data.telecom[0].system === 'phone' && res.data.telecom[0].use === 'home') {
                            home = res.data.telecom[0].value
                        }
                        if(res.data.telecom[1].system === 'phone' && res.data.telecom[1].use === 'mobile') {
                            phone = res.data.telecom[1].value
                        }
                        if(res.data.telecom[2].system === 'email') {
                            mail = res.data.telecom[2].value
                        }
                    }

                    this.setState({
                        active: res.data.active,
                        strasse: res.data.address[0].line[0],
                        plz: res.data.address[0].postalCode,
                        stadt: res.data.address[0].city,
                        land: res.data.address[0].country,
                        birthDate: res.data.birthDate,
                        gender: res.data.gender,
                        nachname: res.data.name[0].family,
                        vorname: res.data.name[0].given[0],
                        telefon: {value: phone},
                        festnetz: home,
                        email:{value: mail},
                        generalPractitioner: res.data.generalPractitioner,
                        isLoading: false
                    })
                    
                })
                .then(() => {
                    if(this.state.generalPractitioner){
                        return axios.get('http://141.37.123.37:8080/baseDstu3/'+this.state.generalPractitioner[0].reference);
                    }
                })
                .then(res => {
                    if(res){
                        this.setState({
                            practitioner:{
                                vorname: res.data.name[0].given[0],
                                nachname: res.data.name[0].family,
                                suffix: res.data.name[0].suffix[0],
                            },
                            isLoading: false
                        })
                    }
                })
                .catch(err => console.log(err))
        }
        
        
    }
    onChangeBirth(e){
        console.log(e.target.value)
        this.setState({
            birthDate: e.target.value
        })
    }
    onChangeGender(e){
        this.setState({
            gender: e.target.value
        })
    }
    onChangeTelefon(e){
        this.setState({
            telefon: {
                value: e.target.value
            }
        })
    }
    onChangeFestnetz(e){
        this.setState({
            festnetz: e.target.value
        })
    }
    onChangeEmail(e){
        this.setState({
            email: {
                value: e.target.value
            } 
        })
    }
    onChangeStr(e){
        console.log(e)
    }
    onChangePlz(e){
        
        this.setState({
            plz: e.target.value
        })
    }
    onChangeStadt(e){
        this.setState({
            stadt: e.target.value
        })
    }
    onChangeLand(e){
        this.setState({
            land: e.target.value
        })
    }
    onChangeVorname(e){
        this.setState({
            vorname: e.target.value
        })
        var hide = document.getElementById('hide');
        var txt = document.getElementById('txt');

        hide.textContent = e.target.value;
        txt.style.width = hide.offsetWidth + "px";
        console.log(txt.value)
    }
    onChangeNachname(e){
        var hide = document.getElementById('hidenach');
        var txt = document.getElementById('txtnach');

        hide.textContent = e.target.value;
        this.setState({
            nachname: e.target.value
        })
        txt.style.width = hide.offsetWidth + "px";
        console.log(txt.style.width, hide.offsetWidth)
    }
    onSubmitUpdate(e){
        e.preventDefault();
        console.log(e.target.value)
    }

    render(){
        var Spinner = require('react-spinkit');
		const {isLoading} = this.state;
	
		if (isLoading) {
		  return  <Spinner name='ball-grid-pulse' className="spinner" color="#00CED1" />;
		}
        return <div key={this.state.userId} className="container">

            <div className="row mb-4">
                <div className="col-md-12">
                    <form className="mb-4" onSubmit={this.onSubmitUpdate.bind(this)}>
                        <h2 className="mt-4 mb-4 pt-4 pb-4 text-center">
                            <span id="hide"></span><input size="4" id="txt" type="text" maxLength="150" ref="vorname" value={this.state.vorname} onChange={this.onChangeVorname.bind(this)}/>
                            <span id="hidenach"></span><input size="4" id="txtnach" maxLength="150" type="text" ref="nachname" value={this.state.nachname} onChange={this.onChangeNachname.bind(this)}/> {this.state.active ? <span className="badge badge-pill badge-success">aktiv</span> : <span className="badge badge-pill badge-danger">inaktiv</span>}
                        </h2>
                        <div className="card mb-4 bg-light">
                            <div className="card-body">            
                                <h5 className="card-title">Stammdaten</h5>
                                <div className="row mb-4">
                                    <div className="form-group col-md-6">
                                        <label><h6 className="card-subtitle mb-2 text-muted mr-4">Geburtsdatum</h6></label>
                                        <input className="form-control" type="date" value={this.state.birthDate} onChange={this.onChangeBirth.bind(this)} placeholder="Geburtsdatum eingeben" required/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><h6 className="card-subtitle mb-2 text-muted mr-4">Geschlecht</h6></label>
                                        <input className="form-control" type="text" value={this.state.gender} onChange={this.onChangeGender.bind(this)} placeholder="Geburtsdatum eingeben" required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label><h6 className="card-subtitle mb-2 text-muted mr-4">Telefon</h6></label>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label>Festnetz</label>
                                                <input className="form-control" type="tel" value={this.state.festnetz} onChange={this.onChangeFestnetz.bind(this)} placeholder="Nummer eingeben" />
                                            </div>
                                            <div className="col-md-3">
                                                <label>Handy</label>
                                                <input className="form-control" type="tel" value={this.state.telefon.value} onChange={this.onChangeTelefon.bind(this)} placeholder="Nummer eingeben" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="text-muted">Email</label>
                                                <input className="form-control" type="email" value={this.state.email.value} onChange={this.onChangeEmail.bind(this)} placeholder="Email eingeben"/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>


                        <div className="card mb-4 bg-light">
                            <div className="card-body">            
                                <h5 className="card-title">Adresse</h5>
                                <div className="form-group">
                                    <label><h6 className="card-subtitle mb-2 text-muted">Straße, Nr.</h6></label>
                                    <input maxLength="150" className="form-control" type="text" value={this.state.strasse} onChange={this.onChangeStr.bind(this)} placeholder="Straße und Hausnummer eingeben" required/>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label><h6 className="card-subtitle mb-2 text-muted">PLZ</h6></label>
                                            <input className="form-control" type="number" pattern="[0-9]{5}" ref="plz" value={this.state.plz} onChange={this.onChangePlz.bind(this)} placeholder="Postleitzahl eingeben" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="formgroup">
                                            <label><h6 className="card-subtitle mb-2 text-muted">Stadt</h6></label>
                                            <input className="form-control" type="text" value={this.state.stadt} onChange={this.onChangeStadt.bind(this)} placeholder="Stadt eingeben" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label><h6 className="card-subtitle mb-2 text-muted">Land</h6></label>
                                            <input className="form-control" type="text" value={this.state.land} onChange={this.onChangeLand.bind(this)} placeholder="Land eingeben" required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-light">
                            <div className="card-body">            
                                <h5 className="card-title">Hausarzt</h5>
                                <div className="alert alert-light">
                                    <h6 className="card-subtitle mb-2 text-muted">Name</h6>
                                    <p className="text-dark">
                                        <strong>{this.state.practitioner.vorname} {this.state.practitioner.nachname}, {this.state.practitioner.suffix}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary">speichern</button>
                            </div>
                        </div>
                    </form>    
                </div>
            </div>
        </div>
    }
}