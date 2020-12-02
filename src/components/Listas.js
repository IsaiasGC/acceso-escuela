import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {  Nav } from 'react-bootstrap';
import ListaAcceso from './ListaAcceso';
import ListaSalida from './ListaSalida';

class Listas extends Component{
  constructor(props) {
    super(props);
    this.state = {
        default: "acceso",
        actual: "acceso"      
    }
  }
  
  componentDidMount(){    
  }
  handleTab=(e)=>{
    this.setState({actual: e});
  }
  render(){
    return (
      <div>
      <React.StrictMode>
        <Nav fill variant="tabs" defaultActiveKey={this.state.default} onSelect={this.handleTab}>
            <Nav.Item>
                <Nav.Link eventKey="acceso" className="nav-link-tab">Acceso</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="salida" className="nav-link-tab">Salida</Nav.Link>
            </Nav.Item>
        </Nav>
        <div>
          { this.state.actual==="acceso" ? <ListaAcceso/> : <ListaSalida/> }
        </div>
      </React.StrictMode>
      </div>
    )      
  }
}

export default withRouter(Listas);
