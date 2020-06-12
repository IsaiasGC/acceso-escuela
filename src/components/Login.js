import React, {Component} from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
// import md5 from 'md5';
import logo from '../logo.svg';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

class Login extends Component {
  state={
    name: '',
    email: '',
    error: false
  }
  email=React.createRef();
  password=React.createRef();

  handleLogin=(e)=>{
    e.preventDefault();
    const pass=this.password.current.value;
    const mail=this.email.current.value;
    // const uri=`/api/usuarios/login`;
    // fetch(uri, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: email,
    //     password: pass
    //   }), // data can be `string` or {object}!
    //   headers:{
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(respuesta => respuesta.json())
    //   .catch(error => {
    //     this.setState({error: true});
    //     MySwal.fire({
    //       icon: 'error',
    //       title: 'Error de Conexion...',
    //       showConfirmButton: false,
    //       timer: 2000
    //     })
    //   })
    //   .then(resultado => {
    //     if(!this.state.error){
    //       if(resultado.status==='authenticated'){
    //         this.setState({
    //           name : resultado.data.nombre,
    //           email: resultado.data.correo
    //         });
    //         return this.props.history.push('/alumnos');
    //       }else {
    //         //alert("Datos Incorrectos!!");
    //         this.password.current.value="";
    //         this.email.current.focus();
    //       }
    //     }else{
    //       this.setState({error: false});
    //     }
    //   });
    if(mail==='15030094@itcelaya.edu.mx' && pass==='el isa'){
      return this.props.history.push('/alumnos');
    }else {
      this.password.current.value="";
      this.email.current.focus();
      MySwal.fire({
        icon: 'error',
        title: 'Credenciales invalidas',
        showConfirmButton: true,
        timer: 2000
      });
    }
    // return this.props.history.push('/alumnos');
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
          </Col>
        </Row>
        <Row className="justify-content-lg-center">
          <Col className="mt-5" lg="5">
            <h1 className="text-center"><img alt="LogoItc" src={logo} width="70" className="d-inline-block align-top" />{'TACS'}</h1>
            <Card className="mt-5 card-login" style={{ width: '100%' }} border="secundary">
              {/* <Card.Header style={{ backgroundColor: '#343a40', color: 'white' }}> */}
                {/* <Card.Title className="text-center">{'Ingresar al Sistema'}</Card.Title> */}
              {/* </Card.Header> */}
              <Card.Body>
                <Form onSubmit={this.handleLogin}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label><i className="fas fa-user"></i> Email:</Form.Label>
                    <Form.Control type="email" ref={this.email} placeholder="Ingresa tu correo" required/>
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label><i className="fas fa-key"></i> Password:</Form.Label>
                    <Form.Control type="password" ref={this.password} placeholder="Contraseña" required/>
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Recordarme" />
                  </Form.Group>
                  <Button type="submit" className="btn btn-primary btn-block">
                    Ingresar <i className="fas fa-sign-in-alt 2x"></i>
                  </Button>
                </Form>
              </Card.Body>
              {/* <Card.Footer className="text-muted"></Card.Footer> */}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Login);
