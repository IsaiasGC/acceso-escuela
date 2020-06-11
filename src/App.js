import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/alumnos' exact component={Login}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
