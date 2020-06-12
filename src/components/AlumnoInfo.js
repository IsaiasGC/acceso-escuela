import React, {Component} from 'react';
import { img } from 'react-bootstrap';

class AlumnoInfo extends Component{
    render() {
        return (
            <div className="Container">
                <div className="foto_alumno" >
                    <img src="..." alt="..." class="img-circle"/>
               </div>
                <div className="nombre_alumno">
                    <h2>Nombre</h2>
                </div>
                <div className="apellidos_alumno">
                    <h2>Apellidos</h2>
                </div>
                <div className="">
                    <h2>Estado</h2>
                </div>
                <div>
                    <h2>email</h2>
                </div>
                <div>
                    <h2>Edad</h2>
                </div>
            </div>
        );
    }
}
export default AlumnoInfo;
    