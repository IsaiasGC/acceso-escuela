import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Navegacion from './components/Navegacion';
// import Alumnos from './components/Alumnos';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={Login}/>
          <Navegacion/>
          <Route path='/' exact component={Login}/>
          <Route path='/alumnos' exact component={Login}/>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
