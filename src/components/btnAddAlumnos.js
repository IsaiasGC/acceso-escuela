import React, { Component, Fragment } from 'react'
import {  Modal, Button, Col, Form, Badge, Card, Row } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa';

class AddAlumnos extends Component {
	constructor(props, context) {
		super(props, context);
		
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false,
			formErrors: {
				nombre: "",
				apellidos: "",
				direccion: "",
				escuela: ""
			  },
			file: null
		};
		
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	handleChange = e => {
		e.preventDefault();
		
		const { name, value } = e.target;
		console.log(name);
		let formErrors = this.state.formErrors;
	
		switch (name) {
		  case 'nombre':
			formErrors.nombre = value.length < 3
			? "No deben ser menos de 3 caracteres" : "";
			break;
	
		  case 'apellidos':
			formErrors.apellidos = value.length < 3
			? "No deben ser menos de 3 caracteres" : "";
			break;

		  case 'direccion':
			formErrors.direccion = value.length < 5
			? "No deben ser menos de 5 caracteres" : "";
			break;

		  case 'escuela':
			formErrors.escuela = value.length < 2
			? "No deben ser menos de 2 caracteres" : "";
			break;
		  case 'foto':
			this.setState({
				file: URL.createObjectURL(e.target.files[0])
			  })
			break;
		  default:
			break;
		}
	
		this.setState({ formErrors, [name]: value}, () => console.log(this.state));
	  };

	render() {
		const { formErrors } = this.state;
		return (
			<Fragment>
			<Button 
			variant="primary" 
			onClick={this.handleShow}>
				Agregar alumno
			</Button>

			<Modal show={this.state.show} onHide={this.handleClose}>
				<Form className="addAlumnoForm" onSubmit={this._onSubmit.bind(this)} ref={(addAlumnoForm) => this.myFormRef = addAlumnoForm} >
					<Modal.Header closeButton>
						<Modal.Title>Registrar alumno</Modal.Title>
					</Modal.Header>
					<Modal.Body>				
						<Col sm>
							<Form.Row>
							<Form.Group as={Col} controlId="formGridName">
								<Form.Label>Nombre</Form.Label>
								<Form.Control
									className={formErrors.nombre.length > 0 ? "is-invalid" : null}
									type="text"
									name="nombre"
									placeholder="Nombre del usuario"
									onChange={this.handleChange}
									ref={(input) => this._nombre = input}
								/>
								{formErrors.nombre.length > 0 && (
								<Badge pill variant="danger">
									{formErrors.nombre}
								</Badge>
								)}
							</Form.Group>
							
							<Form.Group as={Col} controlId="formGridApellidos">
								<Form.Label>Apellidos</Form.Label>
								<Form.Control
									className={formErrors.apellidos.length > 0 ? "is-invalid" : null}
									type="text"
									name="apellidos"
									placeholder="Apellidos del alumno"
									onChange={this.handleChange}
									ref={(input) => this._apellidos = input}
								/>
								{formErrors.apellidos.length > 0 && (
								<Badge pill variant="danger">
									{formErrors.apellidos}
								</Badge>
								)}
							</Form.Group>
							</Form.Row>
							<Form.Row>
							<Form.Group as={Col} controlId="formGridStreet">
								<Form.Label>Dirección</Form.Label>
								<Form.Control
									className={formErrors.direccion.length > 0 ? "is-invalid" : null}
									type="text"
									name="direccion"
									placeholder="Dirección del alumno"
									onChange={this.handleChange}
									ref={(input) => this._direccion = input}
								/>
								{formErrors.direccion.length > 0 && (
								<Badge pill variant="danger">
									{formErrors.direccion}
								</Badge>
								)}
							</Form.Group>

							<Form.Group as={Col} controlId="formGridSchool">
								<Form.Label>Escuela</Form.Label>
								<Form.Control
									className={formErrors.escuela.length > 0 ? "is-invalid" : null}
									type="text"
									name="escuela"
									placeholder="Escuela del alumno"
									onChange={this.handleChange}
									ref={(input) => this._escuela = input}
								/>
								{formErrors.escuela.length > 0 && (
								<Badge pill variant="danger">
									{formErrors.escuela}
								</Badge>
								)}
							</Form.Group>													        
							</Form.Row>
							<Form.Row>            
							<Form.Group as={Col} controlId="formGridPhoto" className="text-center">
								<Form.Label>Foto</Form.Label>
								<Form.File 
									id="custom-file-translate-html"
									label="Foto del alumno"
									data-browse="Seleccionar"
									name="foto"
									custom
									onChange={this.handleChange}
									ref={(input) => this._foto = input}
								/>
								<Row className="justify-content-center">
									<Card style={{ width: '18rem' }}>
										<Card.Img variant="top" src={this.state.file} />
									</Card>
								</Row>								
							</Form.Group>
							</Form.Row>
						</Col>
						
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={this.handleClose}>
								Close
							</Button>
							<Button type="submit" variant="primary">
								Agregar <FaPlusCircle />
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</Fragment>
		);
	}
	_onSubmit = (e) => {
        e.preventDefault();
		/*console.log(this._nombre.value); //it logs the input values.*/
		this.props.handleSubmit(this._nombre.value, this._apellidos.value, this._direccion.value, this._escuela.value, this._foto.value);
		this.myFormRef.reset();
		this.setState({
			file: null
		})
    }
}

export default AddAlumnos;