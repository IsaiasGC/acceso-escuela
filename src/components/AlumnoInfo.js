import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class AlumnoInfo extends Component{
    regresar=()=>{
        return this.props.history.push('/alumnos');
    }
    render() {
        const alumnos=this.props.alumnos;
        return (
            <div className="Container">
                <div>
                    <button type="button" className="btn btn-warning">
                    Regresar
                    </button>
                </div>
                <div className="text-left">
                    <img  src={alumnos.foto} width="200" height="200" alt="Foto Alumno" className="img-circle"/>
               </div>
                <div>
                    <h4 className="text-center">{alumnos.cve}</h4>
                </div>
                <div>
                    <h4 className="text-center">{alumnos.user_name}</h4>
                </div>
                <div>
                    <h4 className="text-center">{alumnos.apellidos}</h4>
                </div>
                <div>
                    <h4 className="text-center">{alumnos.school}</h4>
                </div>
                <div>
                    <h4 className="text-center">{alumnos.street}</h4>
                </div>
            </div>
        );
    }
}
export default AlumnoInfo;
    