import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {  Row, Col, Button, Card } from 'react-bootstrap';
// import axios from 'axios';
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

  _handleSubmit(inNombre, inApellidos, inDireccion, inCURP, inFileSend){
    let apellido = inApellidos;
    let file = inFileSend;
    let curp = inCURP;
    let direccionDefault = inDireccion;
    let nombre = inNombre+"";
    let activo=1;
    var foto = "";

    let data = {
      apellido, activo, foto, curp, direccionDefault, nombre
    }
    this.sendFoto(file, data);
  }

  sendAlumno=(alumno)=>{
    console.log(alumno);
    fetch("http://localhost:4000/api/alumnos",{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(alumno)
    })
    .then(respuesta => respuesta.json())
    .catch(error => console.error('Error:', error))
    .then(resp => {
      console.log(resp);
      let datos = this.state.datos;
      datos.push(alumno);
      this.setState({
        datos: datos
      });
    });
  }
  sendFoto=(foto, alumno)=>{
    var data=new FormData();
    data.append('file', foto);
    fetch("http://localhost:4000/images/foto/alumno",{
      method: 'POST',
      body: data
    })
    .then(respuesta => respuesta.json())
    .catch(error => console.error('Error:', error))
    .then(resp => {
      // console.log(resp);
      alumno.foto=resp.filename;
      this.sendAlumno(alumno);
    });
  }
  mostrarInfo=(data)=>{
    // console.log(data);
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
                <img className="rounded-circle" src={'http://localhost:4000/images/foto/alumno/'+dato.foto} alt="foto" width="100px" height="100px"/>
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
