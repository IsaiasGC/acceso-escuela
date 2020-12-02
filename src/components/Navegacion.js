import React, {Component} from 'react';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import logo from '../logo.svg';

class Navegacion extends Component {
    handleLogout=()=>{
        this.props.logout();
        return this.props.history.push('/login');
    }
    navigate=(link)=>{
        return this.props.history.push('/'+link);
    }
    render() {
        const title=<i className="fas fa-user 2x"></i>;
        return (
        <Navbar collapseOnSelect expand="lg" sticky="top" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <img alt="" src={logo} width="40" className="d-inline-block align-top" />{' TACS'}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-principal"/>
            <Navbar.Collapse id="navbar-principal" className="justify-content-end">
                <Nav>
                    <Nav.Link eventKey="alumnos" onSelect={this.navigate}><i className="fas fa-users"></i> Alumnos</Nav.Link>
                    <Nav.Link eventKey="listas" onSelect={this.navigate}><i className="far fa-list-alt"></i> Listas</Nav.Link>
                    <NavDropdown title={title} alignRight="false">
                        {/* <NavDropdown.Item onClick={this.crud}>
                        <Link to="/crud" replace="true" className="nav-link"><i className="fas fa-database 2x"></i> CRUD</Link>
                        </NavDropdown.Item> */}
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={this.handleLogout} style={{color: 'red'}}>
                            Cerrar Sesion <i className="fas fa-sign-out-alt 2x"></i>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}

export default withRouter(Navegacion);
