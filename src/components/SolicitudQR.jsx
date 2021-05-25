import React, {useState, useEffect} from "react";
import {Button,  Form} from "react-bootstrap";
import axios from "axios";
import "./Formulario.css";
import swal from 'sweetalert';

import QR from "./DownloadQR";
//import DownloadQr from "./DownloadQR";

const URL_HOST="http://areco.gob.ar:9528"
var date;
date = new Date();
date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' //+ 
   // ('00' + date.getUTCHours()).slice(-2) + ':' + 
    //('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    //('00' + date.getUTCSeconds()).slice(-2);
    console.log(date);

const SolicitudQr=()=>{
const [dependencia,setDependecia]=useState([]);
const [propuesta,setPropuesta]=useState([])
const [actividad,setActividad]=useState([]);
const [actividadId,setActividadId]=useState([])
const [sede,setSede]=useState([]);
const [sedeSeleccion,setSedeSeleccion]=useState();
const [horario,sethorario]=useState([]);
const [horarioId,sethorarioId]=useState([]);
const [sesion,setSesion]=useState([]);
const [sesionId,setSesionId]=useState([]);
const [sesionFecha,setSesionFecha]=useState([]);
const [aula,setAula]=useState();
const [hiddenPropuesta,setHiddenPropuesta]=useState(true)
const [hiddenActividad,setHiddenActividad]=useState(true)
const [hiddenHorario,setHiddenHorario]=useState(true)
const [hiddenSesion,setHiddenSesion]=useState(true);
const [hiddenAula,setHiddenAula]=useState(true);
const [isLoading, setLoading] = useState(false);
const [solicitud,Setsolicitud]=useState();
const [idsolicitud,Setidsolicitud]=useState();
const [redirect,setRedirect]=useState(false);

useEffect(() => {
    
      axios.get(URL_HOST+"/api/sede/all")
    .then((resp)=>{
        console.log(resp.data.data)
        setSede(resp.data.data)
        
      })
      .catch((error)=>{console.log(error)})
}, [])
    const handleSede=(e)=>{
        setSedeSeleccion(e.target.value)
        console.log("sede",e.target.value)
        setHiddenPropuesta(true);setHiddenActividad(true);setHiddenHorario(true);setHiddenSesion(true);setHiddenAula(true)
        setDependecia([]);setPropuesta([]);setActividad([]);sethorario([]);setSesion([]);setAula();
        axios.get(URL_HOST+"/api/dependencia/all")
        .then((resp)=>{
            console.log(resp.data.data)
            setDependecia(resp.data.data)
            
        })
        .catch((error)=>{console.log(error)})
    }
    const handleDepencia=(e)=>{
        console.log(e.target.value);
        axios.get(URL_HOST+"/api/propuesta/find/dependencia/"+e.target.value)
        .then((resp)=>{
            console.log(resp.data.data)
            setPropuesta(resp.data.data);setHiddenPropuesta(false);setHiddenActividad(true);setHiddenHorario(true)
            setHiddenSesion(true);setHiddenAula(true);
            setActividad([]);sethorario([]);setSesion([]);setAula();
          })
          .catch((error)=>{console.log(error)})
}

     const handlePropuesta=(e)=>{
        const id_propuesta=e.target.value
        console.log(e.target.value);
        axios.get(URL_HOST+"/api/actividad/find/propuesta/"+id_propuesta)
        .then((resp)=>{
            console.log(resp.data.data)
            setActividad(resp.data.data)
            setHiddenActividad(false)
            setHiddenHorario(true)
            setHiddenSesion(true);
            setHiddenAula(true);
            sethorario([]);setSesion([]);setAula();
          })
          .catch((error)=>{console.log(error)})
     }
     const handleActividad=(e)=>{
        setActividadId(e.target.value);
        console.log(e.target.value);
        axios.get(URL_HOST+"/api/horario/find/sede_actrividad/"+e.target.value+"/"+sedeSeleccion)
        .then((resp)=>{
            console.log(resp.data.data)
            sethorario(resp.data.data)
            setHiddenHorario(false)
            setHiddenSesion(true);
            setHiddenAula(true);
            setHiddenAula(true);
            setSesion([]);setAula();
          })
          .catch((error)=>{console.log(error)})
     }
     const elegirHorario=(e)=>{
         sethorarioId(e.target.value)
         console.log("idHoarario",e.target.value)
         axios.get(URL_HOST+"/api/sesionpresencial/sesionhorario/"+e.target.value)
        .then((resp)=>{
            console.log(resp.data.data);
            setSesion(resp.data.data);
            setHiddenSesion(false);
            setHiddenAula(true);
            setAula();
     
          })
          .catch((error)=>{console.log(error)})

     }
     const handleSesion=(e)=>{
       const id=e.target.value
       console.log('SesionFecha',sesion)
        const session=sesion.filter((data)=>{return data.idSesionPresencial===parseInt(id)})
        console.log('SesionFechaII',session[0].fecha.slice(0,10))
        
         console.log('sesionid',e.target.value)
         setSesionId(id)
         setSesionFecha(session[0].fecha.slice(0,10))
         axios.get(URL_HOST+"/api/aula/find/sesion/"+e.target.value)
         .then((resp)=>{
             console.log(resp.data.data);
             setAula(resp.data.data);
             setHiddenAula(false);
      
           })
           .catch((error)=>{console.log(error)})
     }
     console.log("ddjj",localStorage.getItem("ddjj"))
     const handleSutmit=(e)=>{
        
        const id_ddjj=localStorage.getItem("ddjj");

         axios.post(URL_HOST+"/api/solicitud/create-ddjj-actividad-aula-horario/"+id_ddjj+'/'+actividadId+'/'+aula.idAula+'/'+horarioId+'/?fecha='+sesionFecha,{})
         .then((resp)=>{
             console.log("Solicitus nro",resp.data.data)
             if(resp.data.success){
                
                axios.get(URL_HOST+"/api/solicitud/find/"+resp.data.data)
                .then((resp)=>{
                    
                    Setsolicitud(resp.data.data);
                    
                    console.log("Solicitud",solicitud)
                    setRedirect(true)
                   //swal("","Te registraste con exito tu codigo QR es "+resp.data.data.qrAcceso, "success");
                   
                   
                })
                .catch((error)=>{console.log(error)})
               
             }else{
                 swal("","Aula sin capacidad","error")
             }
            })
         .catch((error)=>{console.log(error)})
         e.preventDefault();
     }

     if(redirect  ){
        return <QR codeqr={solicitud}  />
     }else{
        return(
            <>
           
            <Form className="seccion-container mt-3 mb-3" onSubmit={handleSutmit}>
                <h2 className="subtitulo">Solicitar QR</h2>
                <Form.Group controlId="sede">
                    <Form.Label className="label-preguntas mt-3">Selecciona Sede</Form.Label>
                    <Form.Control size="sm" as="select" onChange={handleSede}>
                        <option  value="" >Seleccione una opcion</option>
                       {sede.map((data,i)=>{
                           return(
                            <option  value={data.idSede} key={i}>{data.nombre}</option>
                           )
                       })}
                   </Form.Control>
                </Form.Group >
                <Form.Group controlId="dependencia">
                    <Form.Label className="label-preguntas mt-3">Selecciona Dependencia</Form.Label>
                    <Form.Control size="sm" as="select" onChange={handleDepencia}>
                        <option  value="" >Seleccione una opcion</option>
                       {dependencia.map((data,i)=>{
                           return(
                            <option  value={data.idDependencia} key={i}>{data.nombre}</option>
                           )
                       })}
                   </Form.Control>
                </Form.Group >
                <div hidden={hiddenPropuesta}>
                    { propuesta.length===0?<p className="mt-3">No hay propuestas asignadas </p>:
                <Form.Group controlId="propuesta" >
                    <Form.Label className="label-preguntas mt-3">Selecciona Propuesta</Form.Label>
                    <Form.Control size="sm" as="select" onChange={handlePropuesta}>
                        <option  value="" >Seleccione una opcion</option>
                       {propuesta.map((data,i)=>{
                           return(
                            <option  value={data.idPropuesta} key={i}>{data.nombre}</option>
                           )
                       })}
                   </Form.Control>
                </Form.Group>
                }
                </div>
               
                <div hidden={hiddenActividad}>
                    {
                     actividad.length===0?<p className="mt-3">No hay actividades asignadas </p>:
                 <Form.Group controlId="actividad" >
                    <Form.Label className="label-preguntas mt-3">Selecciona Actividad</Form.Label>
                    <Form.Control size="sm" as="select" onChange={handleActividad}>
                        <option  value="" >Seleccione una opcion</option>
                       {actividad.map((data,i)=>{
                           return(
                            <option  value={data.idActividad} key={i}>{data.nombre}</option>
                           )
                       })}
                   </Form.Control>
                </Form.Group>
                 }
                </div>
                <div hidden={hiddenHorario}>
               {
                horario.length===0?<p className="mt-3">No hay horarios asignados </p>:
                   <Form.Group controlId="horario" >
                    <Form.Label className="label-preguntas mt-3">Selecciona Horario</Form.Label>
                    <Form.Control size="sm" as="select" onChange={elegirHorario}>
                        <option  value="" >Seleccione una opcion</option>
                       {horario.map((data,i)=>{
                           return(
                            <option  value={data.idHorario} key={i}>{data.nombre}-{data.dia}-{data.horaInicio}-{data.horaFin}</option>
                           )
                       })}
                   </Form.Control>
                </Form.Group>
                    }
            </div>
                 <div hidden={hiddenSesion}>
                     {
                          sesion.length===0?<p className="mt-3">No hay Fechas asignadas </p>:
                        
                <Form.Group controlId="sesion" >
                    <Form.Label className="label-preguntas mt-3">Selecciona una Fecha</Form.Label>
                    <Form.Control size="sm" as="select" onChange={handleSesion}>
                        <option  value="" >Seleccione una opcion</option>
                       {sesion.map((data,i)=>{
                           return(
                            <option  value={data.idSesionPresencial} key={i}>{data.fecha}</option>
                           )
                       })}
                   </Form.Control>
                </Form.Group>
                 }
            </div>
            <div hidden={hiddenAula}>
                <p  className="subtitulo mt-3">Aula:{aula===undefined?null:aula.nombre}</p>
                
                <Button className=" mt-3" variant="primary" type="submit" size="lg" block >Confirmar</Button>
    
            </div>
            
            </Form>
            
            <div>
    
      </div>
            </>
        )
           
     }

   
     
    
}
export default SolicitudQr;