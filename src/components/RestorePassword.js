import React, {Component} from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
// import md5 from 'md5';
import logo from '../logo.svg';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
class RestorePassword extends Component {
	state={
		email: '',
		error: false
	}
	email=React.createRef();

	handleRestore=(e)=>{
		e.preventDefault();
		const email=this.email.current.value;
		const uri='http://localhost:4000/api/usuarios/restore/password/'+email;
		fetch(uri, {
		method: 'GET'
		// body: JSON.stringify({
		// 	email: email,
		// }), // data can be `string` or {object}!
		// headers:{
		// 	'Content-Type': 'application/json'
		// }
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
				if(resultado.status==='success'){
					// console.log(resultado);
					return this.props.history.push('/login');
				}else {
					MySwal.fire({
                        icon: 'error',
                        title: 'Correo no registrado en el sitio',
                        showConfirmButton: false,
                        timer: 2000
                    });
					this.email.current.focus();
				}
			}else{
				this.setState({error: false});
			}
		});
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
						<Card.Header>
							<Card.Title className="text-center text-muted">{'Recuperar Contraseña'}</Card.Title>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={this.handleRestore}>
								<Form.Group controlId="formBasicEmail">
									<Form.Label><i className="fas fa-user"></i> Email:</Form.Label>
									<Form.Control type="email" ref={this.email} placeholder="Ingresa tu correo relacionado a la cuenta" required/>
									<Form.Text className="text-muted">
										Enviaremos un email de recuperacion de contraseña a esta dirrecion.
									</Form.Text>
								</Form.Group>
								<Button type="submit" className="btn btn-primary btn-block">
									Enviar Correo <i className="fas fa-paper-plane 2x"></i>
								</Button>
							</Form>
						</Card.Body>
						<Card.Footer className="text-muted"><Link to="/login">Regresar a Login <i class="fas fa-undo-alt"></i></Link></Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default withRouter(RestorePassword);
