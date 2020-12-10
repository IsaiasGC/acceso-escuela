import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import MaterialTable from 'material-table';
import {  Row, Col } from 'react-bootstrap';
import { withSnackbar } from 'notistack';

class Tutor extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tutores: [],
            newTutor: 0,
            loading: true,
            columns: [
                { title: 'Usuario', field: 'nombre' },
                { title: 'Apellido', field: 'apellido' },
                { title: 'Curp', field: 'curp' },
                { title: 'Telefono', field: 'tel' }
              ]
        }
        this.fetchTutor = this.fetchTutor.bind(this);
        this.updateTutor = this.updateTutor.bind(this);
        this.deleteTutor = this.deleteTutor.bind(this);
    }

    componentDidMount(){
        this.fetchTutor();
    }

    fetchTutor= () => {
        axios.get('http://127.0.0.1:4000/api/tutores/',
        { 
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }
        }
        )
        .then((response) => {
          // handle success
          console.log(response);
          this.setState({tutores: response.data, loading: false});
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });  
    };

    updateTutor = (data) => {
        axios.put(`http://localhost:4000/api/tutores/${data.id}`, data)
        .then((response) => {
            //console.log(response);
            this.key = this.props.enqueueSnackbar(response.data.msj, { 
                variant: response.data.status,
                autoHideDuration: 4000
            });
            this.fetchTutor();
        })
        .catch((error) => {
        console.log(error);
        });
    };

    deleteTutor = (id) => {
        axios.delete(`http://localhost:4000/api/tutores/${id}`)
        .then((response) => {
            //console.log(response);
            this.fetchTutor();
        })
        .catch((error) => {
        console.log(error);
        });
    };

    render(){
        return (
            <div>
                <div className="container-fluid">
                <Row className="justify-content-md-center">
                    <Col md={10} className="section-almns">
                    <MaterialTable
                        title="Tutores"
                        columns={this.state.columns}
                        data={this.state.tutores}
                        localization={{                    
                            body: {
                                emptyDataSourceMessage: 'No hay datos disponibles',
                                filterRow: {
                                    filterTooltip: 'Filtrar'
                                },
                                deleteTooltip: 'Eliminar',
                                editTooltip: 'Editar',
                                editRow: {
                                    deleteText: '¿Estás seguro de querer eliminarlo?',
                                    cancelTooltip: 'Cancelar',
                                    saveTooltip: 'Aceptar'
                                    }
                            },
                            toolbar: {                            
                                searchTooltip: 'Buscar',
                                searchPlaceholder: 'Buscar'
                            },
                            header: {
                                actions: 'Acciones'
                            }
                        }}
                        editable={{
                            // onRowAdd: (newData) =>
                            // new Promise((resolve) => {
                            //     setTimeout(() => {
                            //     resolve();
                            //     setState((prevState) => {
                            //         const data = [...prevState.data];
                            //         data.push(newData);
                            //         return { ...prevState, data };
                            //     });
                            //     }, 600);
                            // }),
                            onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    console.log(newData);
                                    this.updateTutor(newData);
                                }
                                }, 600);
                            }),
                            onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                resolve();
                                //   console.log(oldData);
                                this.deleteTutor(oldData.id); 
                                }, 600);
                            }),
                        }}
                    />
                    </Col>
                </Row>
                </div>
            </div>
        )
    }
}
export default withRouter(withSnackbar(Tutor));