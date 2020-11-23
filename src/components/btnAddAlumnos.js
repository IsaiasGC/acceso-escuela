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
				apellido: "",
				direccionDefault: "",
				curp: ""
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
	
		  case 'apellido':
			formErrors.apellido = value.length < 3
			? "No deben ser menos de 3 caracteres" : "";
			break;

		  case 'direccionDefault':
			formErrors.direccionDefault = value.length < 5
			? "No deben ser menos de 5 caracteres" : "";
			break;

		  case 'curp':
			formErrors.curp = value.length < 2
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
							
							<Form.Group as={Col} controlId="formGridApellido">
								<Form.Label>Apellido</Form.Label>
								<Form.Control
									className={formErrors.apellido.length > 0 ? "is-invalid" : null}
									type="text"
									name="apellido"
									placeholder="Apellido del alumno"
									onChange={this.handleChange}
									ref={(input) => this._apellido = input}
								/>
								{formErrors.apellido.length > 0 && (
								<Badge pill variant="danger">
									{formErrors.apellido}
								</Badge>
								)}
							</Form.Group>
							</Form.Row>
							<Form.Row>
							<Form.Group as={Col} controlId="formGridStreet">
								<Form.Label>Dirección</Form.Label>
								<Form.Control
									className={formErrors.direccionDefault.length > 0 ? "is-invalid" : null}
									type="text"
									name="direccionDefault"
									placeholder="Dirección del alumno"
									onChange={this.handleChange}
									ref={(input) => this._direccionDefault = input}
								/>
								{formErrors.direccionDefault.length > 0 && (
								<Badge pill variant="danger">
									{formErrors.direccionDefault}
								</Badge>
								)}
							</Form.Group>

							<Form.Group as={Col} controlId="formGridSchool">
								<Form.Label>CURP</Form.Label>
								<Form.Control
									className={formErrors.curp.length > 0 ? "is-invalid" : null}
									type="text"
									name="curp"
									placeholder="CURP del alumno"
									onChange={this.handleChange}
									ref={(input) => this._curp = input}
								/>
								{formErrors.curp.length > 0 && (
								<Badge pill variant="danger">
									{formErrors.curp}
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
		this.props.handleSubmit(this._nombre.value, this._apellido.value, this._direccionDefault.value, this._curp.value, this.state.file);
		this.myFormRef.reset();
		this.setState({
			file: null
		})
    }
}

export default AddAlumnos;