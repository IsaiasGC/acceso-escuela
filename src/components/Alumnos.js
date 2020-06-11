import React, { Component } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Alumnos extends Component{
  state={
    datos: []
  }
  componentDidMount(){
    fetch('URL')
      .then(response => response.json())
      .then((data)=>{
          this.setState({
          datos: data.alumnos
        })
      })
      .catch(console.log)
  }
  render(){
    return this.state.datos.map((dato,index)=>{
      return(
          <div className="card" key={index}>
            <img src={dato.imagen} alt="imagen_producto" />
            <h4>{dato.producto}</h4>
            <p>{dato.descripcion}</p>
            <div>
              <Badge pill variant="light">
                $ {dato.precioventa}
              </Badge>
            </div>
            <Link to={"/producto/"+dato.idproducto}>
              <Button variant="success" style={{"width": "50%"}} >Ver Más</Button>
            </Link>
        </div>
        );
      })
    }
}

export default Alumnos;
