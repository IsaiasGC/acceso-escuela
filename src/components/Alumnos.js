import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {  Row, Col, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import AddAlumnos from './btnAddAlumnos';
// import '../css/almns.css';
import { FaInfoCircle } from 'react-icons/fa';

class Alumnos extends Component{
  constructor(props) {
    super(props);
    this.state = {
        datos: []          
    }
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  
  componentDidMount(){    
    // let payload = {
    //   token: "nBlkTNT48qxCqftPuRvYRw",
    //   data: {
    //     "_repeat": 5,
    //     "apellidos": "nameLast",
    //     "cve": "stringCharacters",
    //     "foto": "personAvatar",
    //     "school": "companyName",
    //     "street": "addressStreetName",
    //     "user_name": "nameFirst"
    //   }
    // };
    // var self = this;
    // axios({
    // method: "post",
    // url: "https://app.fakejson.com/q",
    // data: payload
    // }).then(function(resp) {
    //   // console.log(resp.data);
    //   self.setState({datos: resp.data})
    // });
    fetch("http://localhost:4000/api/alumnos",{
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
    })
    .then(respuesta => respuesta.json())
    .then(resp => {
      // console.log(resp);
      this.setState({datos: resp})
    });

  }

  _handleSubmit(inNombre, inApellidos, inDireccion, inCURP, inFoto){
    //console.log(nombre+apellidos+direccion+escuela+foto);
    // var fs=require('fs');
    let datos = this.state.datos;
    let apellido = inApellidos;
    let foto = inFoto;
    let curp = inCURP;
    let direccionDefault = inDireccion;
    let nombre = inNombre+"";
    let activo=1;
    var target_path = './images/'+nombre.replace(" ", "_")+curp+'.jpg';
    console.log(target_path);
    // fs.copyFile(foto, target_path, (err)=>{});
    let data = {
      apellido, activo, target_path, curp, direccionDefault, nombre
    }

    datos.push(data);
    this.setState({
      datos: datos
    });
  }
  mostrarInfo=(data)=>{
    console.log(data);
    this.props.history.push({
      pathname: '/alumnos/info',
      search: '?id='+data.cve,
      state: { alumno: data }
    });
  }
  render(){
    return (
      <div>
      <React.StrictMode>
      <div className="container-fluid">
        <Row>
          <Col md={2} className="section-btn">
            <AddAlumnos 
            handleSubmit={this._handleSubmit.bind(this)}
            />
          </Col>
          <Col md={8} className="section-almns">
            <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">Alumnos</h6>
            {
              this.state.datos.map((dato)=>(
                <div className="media text-muted pt-3" key={dato.cve}>
                <img className="rounded-circle" src={'/images/'+dato.foto} alt="foto" width="100px" height="100px"/>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong className="d-block text-gray-dark">{dato.nombre} {dato.apellido}</strong>
                <Card>
                  <Card.Body>
                    <p>Status: {dato.activo} </p>
                    <p>Dirección: {dato.direccionDefault}</p>
                    <Button variant="primary" onClick={(e)=>{this.mostrarInfo(dato);}}>
                      Ver alumno <FaInfoCircle />
                    </Button>
                  </Card.Body>
                </Card>                  
                </p>
              </div>
              ))
            }
            </div>
          </Col>
        </Row>
        
       
      </div>
      </React.StrictMode>
      </div>
    )      
  }
}

export default withRouter(Alumnos);
