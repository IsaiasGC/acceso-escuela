import React, {Component} from 'react';
import md5 from 'md5';
import logo from '../images/LogoItc.png';
import cinta from '../images/cinta.jpg';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

class Login extends Component {
  state={
    name: '',
    email: '',
    error: false
  }
  handleLogin=(e)=>{
    e.preventDefault();
    const pass=md5(document.getElementById('pass').value);
    const uri=`/api/usuarios/login`;
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify({
        email: document.getElementById('email').value,
        password: pass
      }), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(respuesta => respuesta.json())
      .catch(error => {
        this.setState({error: true});
        MySwal.fire({
          icon: 'error',
          title: 'Error de Conexion...',
          showConfirmButton: false,
          timer: 2000
        })
      })
      .then(resultado => {
        if(!this.state.error){
          if(resultado.status==='authenticated'){
            this.setState({
              name : resultado.data.nombre,
              email: resultado.data.correo
            });
            this.props.login(this.state);
          }else {
            //alert("Datos Incorrectos!!");
            document.getElementById("pass").value='';
            document.getElementById("email").focus();
          }
        }else{
          this.setState({error: false});
        }
      });
  }
  render() {
    return (
      <div className="container-fluid pl-5">
        <div className="row col-12 justify-content-center">
          <img src={cinta} alt="cintaITC" className="img-fluid" style={{width: "100%"}}/>
        </div>
        <div className="row col-lg-12 col-md-12 justify-content-center">
          <div className="card" style={{marginTop: "40px"}}>
            <div className="card-header lince">
              <h1 className="text-center"><img alt="LogoItc" src={logo} width="30" className="d-inline-block align-top" />{' Gimnasio'}</h1>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleLogin}>
                <div className="card-body">
                  <input id="email" name="email" type="email" className="form-control" placeholder="usuario@itcelaya.edu.mx" required="required"/>
                </div>
                <div className="card-body">
                  <input id="pass" name="pass" type="password" className="form-control" placeholder="contraseña" required="required"/>
                </div>
                <div className="card-body">
                  <button type="submit" className="btn btn-success btn-block">
                    Ingresar <i class="fas fa-sign-in-alt 2x"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
