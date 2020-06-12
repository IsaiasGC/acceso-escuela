import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Alumnos from './components/Alumnos';
import AlumnoInfo from './components/AlumnoInfo';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/alumnos' exact component={Alumnos}/>
        <Route path='/AlumnoInfo' exact component={AlumnoInfo}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
