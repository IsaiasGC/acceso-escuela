import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import RegistroSalida from './RegistroSalida';
const MySwal = withReactContent(Swal);

class ListaSalida extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datos: [],
			filtrados: [],
			hoy: {}
		}
	}
	filtro = React.createRef();

	componentDidMount() {
		this.getHoy().then(respuesta => this.getPorsalir());
	}
	getHoy = async () => {
		await fetch("http://localhost:4000/api/fechas/hoy", {
			method: 'GET',
			mode: 'cors',
			credentials: 'same-origin',
		})
			.then(respuesta => respuesta.json())
			.then(fecha => {
				// console.log(resp);
				this.setState({ hoy: fecha });
			});
	}
	getPorsalir = () => {
		fetch("http://localhost:4000/api/alumnos/porsalir/" + this.state.hoy.id, {
			method: 'GET',
			mode: 'cors',
			credentials: 'same-origin',
		})
			.then(respuesta => respuesta.json())
			.then(resp => {
				// console.log(resp);
				this.setState({ datos: resp, filtrados: resp })
			});
	}
	handleChange = () => {
		var filtro = this.filtro.current.value;
		if (filtro === "") {
			this.setState({ filtrados: this.state.datos });
		} else {
			let flt = this.state.datos.filter(dato => {
				return (dato.nombre.includes(filtro) || dato.apellido.includes(filtro));
			});
			this.setState({ filtrados: flt });
		}
	}
	marcarSalida = (data, comentario = "") => {
		var body = {
			id_fecha: this.state.hoy.id,
			id_alumno: data.id,
			id_registrador: 1,
			comentario
		}
		// console.log(body);
		fetch("http://localhost:4000/api/listas/salida", {
			method: 'post',
			mode: 'cors',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(respuesta => respuesta.json())
			.catch(err => {
				MySwal.fire({
					icon: 'error',
					title: 'Error de Conexion...',
					showConfirmButton: false,
					timer: 2000
				});
			})
			.then(resp => {
				console.log(resp);
				if (resp.status === "error") {
					MySwal.fire({
						icon: 'error',
						title: resp.msj,
						showConfirmButton: false,
						timer: 2000
					});
				} else {
					MySwal.fire({
						icon: 'success',
						title: 'Salida marcada',
						showConfirmButton: false,
						timer: 1000
					});
					this.getAusentes();
				}
			});
	}
	render() {
		return (
			<div>
				<React.StrictMode>
					<div className="container-fluid">
						<Row className="justify-content-md-center">
							<Col md={8} className="section-almns">
								<div className="my-3 p-3 bg-white rounded shadow-sm">
									<h6 className="border-bottom border-gray pb-2 mb-0">Salida de Alumnos</h6>
									<p></p>
									<Form.Group as={Row} controlId="filtroForm" className="justify-content-end">
										<Form.Label column md="2" className="text-muted">Filtro: </Form.Label>
										<Col md="8">
											<Form.Control
												style={{ backgroundColor: "beige" }}
												type="text"
												name="filtro"
												placeholder="Ingrese lo que quiere filtrar"
												onChange={this.handleChange}
												ref={this.filtro}
											/>
										</Col>
									</Form.Group>
									<p className="border-bottom border-gray pb-2 mb-0"></p>
									{this.state.filtrados.length > 0 ?
										this.state.filtrados.map((dato) => (
											<div className="media text-muted pt-3" key={dato.cve}>
												<img className="rounded-circle" src={'http://localhost:4000/images/foto/alumno/' + dato.foto} alt="foto" width="100px" height="100px" />
												<p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
													<strong className="d-block text-gray-dark">{dato.nombre} {dato.apellido}</strong>
													<Card>
														<Card.Body>
															<Row>
																<Col md={8}>
																	<p>Status: {dato.activo} </p>
																	<p>Dirección: {dato.direccionDefault}</p>
																</Col>
																<Col md={4}>
																	{/* <Button variant="danger" onClick={(e) => { this.marcarSalida(dato); }}>
																		Salida <i class="fas fa-check"></i>
																	</Button> */}
																	<RegistroSalida alumno={dato} marcarSalida={this.marcarSalida} />
																</Col>
															</Row>
														</Card.Body>
													</Card>
												</p>
											</div>
										))
										:
										<p className=" text-center border-bottom border-gray pb-2 mb-0"><h4>Sin Resultados</h4></p>
									}
								</div>
							</Col>
						</Row>
					</div>
				</React.StrictMode>
			</div>
		)
	}
}

export default withRouter(ListaSalida);
