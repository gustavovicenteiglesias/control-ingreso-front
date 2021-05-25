import React, { useState } from "react";
import { Form,Button } from "react-bootstrap";
import "./Formulario.css";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
const URL_HOST="http://areco.gob.ar:9528"
const DatosPersonales = () => {
  var persona={};
 
  const[idPersona,setIdPersona]=useState(null);
  const[correoElectronico,setCorreoElectronico]=useState();
  const[direccion,setDireccion]=useState();
  const[dni,setDni ] =useState();
  const [nombre,setNombre]=useState();
  const [telefono,setTelefono]=useState();
  const [redirect,setRedirect]=useState(false);

 
 const handleChangeDni=(e)=>{
      console.log(e.target.value);
    const dnis=e.target.value
      axios.get(URL_HOST+"/api/persona/find/dni/"+dnis)
      .then((res)=>{
        if(res.data.success){
          setIdPersona(res.data.data.idPersona);
          setNombre(res.data.data.nombre);
          setTelefono(res.data.data.telefono);
          setCorreoElectronico(res.data.data.correoElectronico)
          setDni(res.data.data.dni)
          setDireccion(res.data.data.direccion)
         
        }else {
          setDni( e.target.value)
          setIdPersona(null);
          setNombre("");
          setTelefono("");
          setCorreoElectronico("")
          setDireccion("")
        }
      }) 
     }
     const handleNombre=(event)=>{setNombre(event.target.value)};
     const handleTelefono=(event)=>{setTelefono(event.target.value)};
      const handleDireccion=(e)=>{setDireccion(e.target.value)};
      const handleCorreoElectronico=(e)=>{setCorreoElectronico(e.target.value)};
      

      const handleSubmit=(e)=>{
        e.preventDefault();
        if (!idPersona) {
         persona={
            correoElectronico:correoElectronico,
            direccion:direccion,
            dni:dni,
            nombre:nombre,
            telefono:telefono,

          }
          console.log("submit",persona)
          axios.post(URL_HOST+"/api/persona/create",persona)
          .then((resp)=>{
            console.log(resp.data)
            localStorage.setItem("id_persona", resp.data.data)
            localStorage.setItem("nombre", nombre)
            console.log("id_persona",localStorage.getItem("id_persona"))
          })
          .catch((error)=>{console.log(error)})
          
          setRedirect(true)
          
        } else {
          localStorage.setItem("id_persona", idPersona)
          localStorage.setItem("nombre", nombre)
          console.log(localStorage.getItem("id_persona"))
          setRedirect(true)
        }
       
      } 
      
      
        //Render o redirect cuando se complete 
           
          if (redirect) {
            return <Redirect to="/ddjj"/>
          }else{
            return(
              <Form className="seccion-container mt-3 mb-3" onSubmit={handleSubmit}>
                  <h2>Datos Personales</h2>
            <Form.Group controlId="dni">
              <Form.Label className="label-preguntas mt-3">Ingrese DNI </Form.Label>
              <Form.Control type="text" placeholder="Ingrese DNI" onChange={handleChangeDni}  />
             
            </Form.Group>
            
            <Form.Group controlId="nombreyapellido">
              <Form.Label>Nombre y Apellido</Form.Label>
              <Form.Control required type="text" placeholder="Nombre y Apellido" onChange={handleNombre} value={nombre}/>
            </Form.Group>
            <Form.Group controlId="direccion">
              <Form.Label>Direccion</Form.Label>
              <Form.Control  required type="text" placeholder="Direccion" onChange={handleDireccion}  value={direccion}/>
            </Form.Group>
            <Form.Group controlId="telefono">
              <Form.Label>Telefono</Form.Label>
              <Form.Control  required type="text" placeholder="Telefono" onChange={handleTelefono} value={telefono} />
            </Form.Group>
            <Form.Group controlId="correo_electronico">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control required type="email" placeholder="Correo Electronico" onChange={handleCorreoElectronico} value={correoElectronico}/>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2" block>Confirmar</Button>
          </Form>
         
              )
          }
        }
            


export default DatosPersonales;