import React, { Component, Fragment } from 'react'
import { Modal, Button, Col, Form, Card, Row } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa';

class RegistroEntrada extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            alumno: this.props.alumno
        };

    }
    comentario = React.createRef();

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleChange = e => {
        e.preventDefault();
    };
    _onSubmit = (e) => {
        e.preventDefault();
        /*console.log(this._nombre.value); //it logs the input values.*/
        this.props.marcarAsistencia(this.state.alumno, this.comentario.current.value);
        this.handleClose();
    }
    render() {
        return (
            <Fragment>
                <Button
                    variant="primary"
                    onClick={this.handleShow}>
                    Asistencia <i class="fas fa-check"></i>
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Form className="addAlumnoForm" onSubmit={this._onSubmit.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Registrar Entrda de Alumno</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col sm>
                                <Row className="justify-content-center">
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={'http://localhost:4000/images/foto/alumno/' + this.state.alumno.foto} alt={this.state.alumno.curp} />
                                    </Card>
                                </Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nombre"
                                            placeholder="Nombre del usuario"
                                            value={this.state.alumno.nombre}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridApellido">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="apellido"
                                            placeholder="Apellido del alumno"
                                            value={this.state.alumno.apellido}
                                            disabled
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridStreet">
                                        <Form.Label>Dirección</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="direccionDefault"
                                            placeholder="Dirección del alumno"
                                            value={this.state.alumno.direccion}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridSchool">
                                        <Form.Label>CURP</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="curp"
                                            placeholder="CURP del alumno"
                                            value={this.state.alumno.curp}
                                            disabled
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridPhoto" className="text-center">
                                        <Form.Label>Comentarios</Form.Label>
                                        <Form.Control as="textarea" rows={4} ref={(ref) => this.comentario = ref} />
                                    </Form.Group>
                                </Form.Row>
                            </Col>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
							</Button>
                            <Button type="submit" variant="primary">
                                Marcar <FaPlusCircle />
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Fragment>
        );
    }
}

export default RegistroEntrada;