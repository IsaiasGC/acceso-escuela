import React, {Component} from 'react';
import logo from '../logo.svg';

class AlumnoInfo extends Component{
    render() {
        return (
            <div className="Container">
                <div>
                    <button type="button" className="btn btn-warning">
                    Regresar
                    </button>
                </div>
                <div className="text-left">
                    <img  src={logo} width="200" height="200" alt="Foto Alumno" className="img-circle"/>
               </div>
                <div className="nombre_alumno">
                    <h4 className="text-center">Nombre</h4>
                </div>
                <div className="apellidos_alumno">
                    <h4 className="text-center">Apellidos</h4>
                </div>
                <div className="">
                    <h4 className="text-center">Estado</h4>
                </div>
                <div>
                    <h4 className="text-center">email</h4>
                </div>
                <div>
                    <h4 className="text-center">Edad</h4>
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-success">Editar</button>
                    <button type="button" className="btn btn-danger">Eliminar</button>
                </div>
            </div>
        );
    }
}
export default AlumnoInfo;
    