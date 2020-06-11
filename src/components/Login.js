import React, {Component} from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
// import md5 from 'md5';
import logo from '../logo.svg';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

class Login extends Component {
  state={
    name: '',
    email: '',
    error: false
  }
  handleLogin=(e)=>{
    return this.props.history.push('/alumnos');
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
            <Card className="mt-5 card-login" style={{ width: '100%' }} border="dark">
              <Card.Header style={{ backgroundColor: '#343a40', color: 'white' }}>
                <h1 className="text-center"><img alt="LogoItc" src={logo} width="70" className="d-inline-block align-top" />{'TACS'}</h1>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={this.handleLogin}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label><i class="fas fa-user"></i> Email:</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Ingresa tu correo" required/>
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label><i class="fas fa-key"></i> Password:</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Contraseña" required/>
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Recordarme" />
                  </Form.Group>
                  <Button type="submit" className="btn btn-primary btn-block">
                    Ingresar <i class="fas fa-sign-in-alt 2x"></i>
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
