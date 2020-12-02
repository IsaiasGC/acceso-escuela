import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {  Row, Col, Button, Card, Form } from 'react-bootstrap';

class ListaAcceso extends Component{
  constructor(props) {
    super(props);
    this.state = {
        datos: [],
        filtrados: []     
    }
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  filtro=React.createRef();
  
    componentDidMount(){    
        fetch("http://localhost:4000/api/alumnos",{
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        })
        .then(respuesta => respuesta.json())
        .then(resp => {
        // console.log(resp);
        this.setState({datos: resp, filtrados: resp})
        });
    }
    handleChange=()=>{
        var filtro=this.filtro.current.value;
        if(filtro===""){
            this.setState({filtrados: this.state.datos});
        }else{
            let flt=this.state.datos.filter( dato =>{
                return (dato.nombre.includes(filtro) || dato.apellido.includes(filtro));
            });
            this.setState({filtrados: flt});
        }
    }
    _handleSubmit(inNombre, inApellidos, inDireccion, inCURP, inFileSend){
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
                <Row className="justify-content-md-center">
                    <Col md={8} className="section-almns">
                        <div className="my-3 p-3 bg-white rounded shadow-sm">
                            <h6 className="border-bottom border-gray pb-2 mb-0">Asistencia de Alumnos</h6>
                            <p></p>
                            <Form.Group as={Row} controlId="filtroForm" className="justify-content-end">
                                <Form.Label column md="2" className="text-muted">Filtro: </Form.Label>
                                <Col md="8">
                                    <Form.Control
                                        style={{backgroundColor:"beige"}}
                                        type="text"
                                        name="filtro"
                                        placeholder="Ingrese lo que quiere filtrar"
                                        onChange={this.handleChange}
                                        ref={this.filtro}
                                    />
                                </Col>
                            </Form.Group>
                            <p className="border-bottom border-gray pb-2 mb-0"></p>
                            {this.state.filtrados.length>0 ? 
                                this.state.filtrados.map((dato)=>(
                                    <div className="media text-muted pt-3" key={dato.cve}>
                                        <img className="rounded-circle" src={'http://localhost:4000/images/foto/alumno/'+dato.foto} alt="foto" width="100px" height="100px"/>
                                        <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                            <strong className="d-block text-gray-dark">{dato.nombre} {dato.apellido}</strong>
                                            <Card>
                                            <Card.Body>
                                                <Row>
                                                    <Col md={8}>
                                                        <p>Status: {dato.activo} </p>
                                                        <p>Dirección: {dato.direccionDefault}</p>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Button variant="success" onClick={(e)=>{this.mostrarInfo(dato);}}>
                                                            Asistencia <i class="fas fa-check"></i>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                            </Card>                  
                                        </p>
                                    </div>
                                ))
                            : 
                                <p className=" text-center border-bottom border-gray pb-2 mb-0"><h4>Sin Resultados</h4></p>
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

export default withRouter(ListaAcceso);
