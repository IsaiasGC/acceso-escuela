import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/Login';
import Navegacion from './components/Navegacion';
import Alumnos from './components/Alumnos';
import NotFound from './components/NotFound';
import AlumnoInfo from './components/AlumnoInfo';
import Reconocedor from './components/Reconocedor';

class App extends Component {
	constructor(props) {
		super(props);
		var loged=sessionStorage.getItem('isLoggedIn');
		this.state = {isLoggedIn: loged??false};
	}
	login=()=>{
		sessionStorage.setItem('isLoggedIn', true);
		this.setState({
			isLoggedIn: true
		});
	}
	logout=()=>{
		sessionStorage.clear();
		this.setState({
			isLoggedIn: false
		});
	}
	render(){
		return (
			<React.Fragment>
			<BrowserRouter>
				{ this.state.isLoggedIn && <Navegacion logout={this.logout}/> }
				<Switch>
					<Redirect from='/' to='/alumnos' exact/>
					{ this.state.isLoggedIn ? <Redirect from='/login' to='/alumnos'/> : <Redirect from='/alumnos' to='/login' exact/> }
					{/* { !this.state.isLoggedIn && <Redirect from='/alumnos' to='/login'/> } */}
					<Route path='/login' exact render={()=><Login login={this.login}/>}/>
					<Route path='/alumnos' exact render={()=><Alumnos/>}/>
					<Route path='/alumnos/info' exact render={()=><AlumnoInfo/>}/>
					<Route path='/registro' exact render={()=><Reconocedor/>}/>
					<Route path="*" component={NotFound}/>
				</Switch>
			</BrowserRouter>
			</React.Fragment>
		);
	}
}

export default App;
