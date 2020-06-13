import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import logo from '../logo.svg';
import { } from 'react-bootstrap';

class AlumnoInfo extends Component{
    regresar=()=>{
        return this.props.history.push('/alumnos');
    }
    render() {
        const alumnos=this.props.location.state.alumnos;
        return (
            <div className="container">
            <div className="p-3 mb-2 bg-light text-dark" > 
                <div className="p-3 mb-2 bg-info text-white">
                    <h3 class="text-center">Información de Alumno</h3>
                </div>
                <div className="panel-body">
                    <div>
                        <button type="button" className="btn btn-success">
                        Regresar
                        </button>
                    </div>
                   <div className="row">
                        <div className="col-md-4">
                            <img  src={logo} width="300" height="300" alt="Foto Alumno" className="img-circle"/>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <h6 className="text-secondary">Clave: </h6>
                                <h5>{alumnos.cve}</h5>
                            </div>
                            <div>
                                <h6 className="text-secondary">Nombre:</h6>
                                <h5>{alumnos.user_name}</h5>
                            </div>
                            <div>
                                <h6 className="text-secondary">Apellido:</h6>
                                <h5>{alumnos.apellidos}</h5>
                            </div>
                        </div>{/*Fin 1 Col*/}
                        <div className="col-md-4">
                            <div>
                                <h6 className="text-secondary">Escuela:</h6>
                                <h5>{alumnos.school}</h5>
                            </div>
                            <div>
                                <h6 className="text-secondary">Calle:</h6>
                                <h5>{alumnos.street}</h5>
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
    