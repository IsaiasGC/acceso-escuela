import React, {Component} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
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
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="text-center mt-5">
              <Card.Header>
                <h1 className="text-center"><img alt="LogoItc" src={logo} width="30" className="d-inline-block align-top" />{' Gimnasio'}</h1>
              </Card.Header>
              <Card.Body>
                <form onSubmit={this.handleLogin}>
                  <div className="card-body">
                    <input id="email" name="email" type="email" className="form-control" placeholder="usuario@itcelaya.edu.mx" required="required"/>
                  </div>
                  <div className="card-body">
                    <input id="pass" name="pass" type="password" className="form-control" placeholder="contraseña" required="required"/>
                  </div>
                  <div className="card-body">
                  <Button type="submit" className="btn btn-success btn-block">
                    Ingresar <i class="fas fa-sign-in-alt 2x"></i>
                  </Button>
                  </div>
                </form>
              </Card.Body>
              <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
