import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
// import logo from '../logo.svg';
import { } from 'react-bootstrap';

class AlumnoInfo extends Component{
    regresar=()=>{
        return this.props.history.push('/alumnos');
    }
    render() {
        console.log(this.props.location);
        
        const alumnos=this.props.location.state.alumno;
        return (
            <div className="container">
            <div className="p-3 mb-2 bg-light text-dark" > 
                <div className="p-3 mb-2 bg-info text-white">
                    <h3 class="text-center">Información de Alumno</h3>
                </div>
                <div className="panel-body">
                    <div>
                        <button type="button" className="btn btn-success" onClick={this.regresar}>
                        Regresar
                        </button>
                    </div>
                   <div className="row">
                        <div className="col-md-4">
                            <img  src={'/images/'+alumnos.foto} width="300" height="300" alt="Foto Alumno" className="img-circle"/>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <h6 className="text-secondary">Clave: </h6>
                                <h5>{alumnos.curp}</h5>
                            </div>
                            <div>
                                <h6 className="text-secondary">Nombre:</h6>
                                <h5>{alumnos.nombre}</h5>
                            </div>
                            <div>
                                <h6 className="text-secondary">Apellido:</h6>
                                <h5>{alumnos.apellido}</h5>
                            </div>
                        </div>{/*Fin 1 Col*/}
                        <div className="col-md-4">
                            <div>
                                <h6 className="text-secondary">Status:</h6>
                                <h5>{alumnos.activo}</h5>
                            </div>
                            <div>
                                <h6 className="text-secondary">Calle:</h6>
                                <h5>{alumnos.direccionDefault}</h5>
                            </div>
                        </div>{/*Fin 2 Col*/}
                    </div>
                </div>{/* Fin panel Body*/}
            </div>{/*//fin panel*/}
            </div>//fin container
        );
    }
}
export default withRouter(AlumnoInfo);
    