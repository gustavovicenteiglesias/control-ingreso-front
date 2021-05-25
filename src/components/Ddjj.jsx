import React, {useState, useEffect,useRef} from "react";
import {Button, Col, Form} from "react-bootstrap";
import axios from "axios";
import "./Formulario.css";
import { Redirect } from "react-router";


const Ddjj = () => {
  
        
   
    var date;
date = new Date();
date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' //+ 
   // ('00' + date.getUTCHours()).slice(-2) + ':' + 
    //('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    //('00' + date.getUTCSeconds()).slice(-2);
    console.log(date);

    const inputRef = useRef([]);
    const [respuestas,setRespuestas]=useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [factorDeRiesgoData, setFactorDeRiesgoData] = useState([]);
    const [factorDeRiesgo, setFactorDeRiesgo] = useState([]);
    const [fecha,setFecha]=useState();
    const [ddjj,setDdjj]=useState();
    const [redirect,setRedirect]=useState(false);
    const postDdjj=(ddjjs)=>{
  
        if (typeof ddjjs.fecha !== undefined && ddjj.respuestas.length !== 0) {
            console.log("Data",ddjjs)
            axios.post("http://areco.gob.ar:9528/api/ddjj/crear/"+localStorage.getItem("id_persona"),ddjj)
            .then((resp)=>{
                console.log("success")
                console.log(resp.data.data)
                localStorage.setItem("ddjj", resp.data.data)
                console.log("ddjj",localStorage.getItem("ddjj"))
                setRedirect(true);
            })
            .catch((error)=>{console.log(error)})
            
        }
           
       }

    const handleChangeFactor=(fr,nombre)=>{
       console.log(fr,nombre)
       setFactorDeRiesgo(prevState=>[...prevState,{
        idFactorDeRiesgo: fr,
        nombre: nombre,
    } ])
    }
    const handleSubmit = (event) => {
        setFecha(date);
        inputRef.current.map((data,i)=>{
            return(
               setRespuestas(prevState=>[...prevState,{
                pregunta:{
                    idPregunta:i+1
                },
                afirmativo: !data.checked
            } ])
             
            )
        })
       
        event.preventDefault();
   
        
       
    }
   
    useEffect(() => {
        axios.get(`http://areco.gob.ar:9528/api/pregunta/all`).then((res) => {
            setPreguntas(res.data.data);
        });
        axios.get(`http://areco.gob.ar:9528//api/FactorDeRiesgo/all`).then((res) => {
            setFactorDeRiesgoData(res.data.data);
        });
        inputRef.current = new Array(preguntas.length);
    }, []);
    
    useEffect( () => {
        if(preguntas.length !== 0) {
            inputRef.current[preguntas.length - 1].focus();
         }
    }, [preguntas]);
    useEffect(() => {
        setDdjj({
            fecha,
            factorDeRiesgo,
            respuestas,
        })
        
    }, [fecha,factorDeRiesgo,respuestas])
    useEffect(() => {
        if (typeof fecha !== undefined && respuestas.length !== 0) {
            postDdjj(ddjj)
        } 
    }, [fecha,ddjj,respuestas])
    console.log(localStorage.getItem("id_persona"))
    console.log(localStorage.getItem("nombre"))


    if (redirect) {
        return <Redirect to="/solicitud"/>
      }else{
    if (localStorage.getItem("id_persona")!==null) {
    return (
        
        <>
        <Form className="seccion-container mb-3" onSubmit={handleSubmit}>
            <h2 className="subtitulo">Declaración Jurada</h2>
            <h3 className="subtitulo">{localStorage.getItem("nombre")}</h3>
            {preguntas.map((pregunta, i) => {
                return (
                    <div >
                        <Form.Label  className="label-preguntas mt-3">{pregunta.descripcion}</Form.Label>
                        
                        <Form.Check
                           ref = {el => inputRef.current[i] = el}
                            required
                            xs={6}
                            name={"pregunta"+(i+1)}
                            label="Si"
                            key={i}
                            type="radio"
                           
                           
                        />
                        
                        <Form.Check
                           
                           ref = {el => inputRef.current[i] = el}
                          
                            required
                            xs={6}
                            name={"pregunta"+(i+1)}
                            label="No"
                            key={10+i}
                            type="radio"
                           
                           
                    
                        />
                       
                    </div>
                );
            })}
           
            {/*TODO: Agregar Todo lo que sea factor de riesgo (select con opciones multiples) Cada vez que una persona realiza la DDJJ, hay que serializarla Value tiene que ser un array. Tamaño = cant
            preguntas
                    Manejar cuando intercambian de opcion en cada pregunta
                    Antes de hacer el PUT aplicar .filter() al array que usamos*/}
       
        <h2 className="subtitulo">Si tu situacion de salud contempla alguna de las siguientes opciones,seleccione algunas de las siguientes opciones </h2>
            {factorDeRiesgoData.map((data,i)=>{
                return(
                    <>
                    <Form.Label key={10+i} className="label-preguntas mt-3">{factorDeRiesgo.nombre}</Form.Label>
                        <Form.Check
                            
                            xs={6}
                            name={data.nombre}
                            label="Si"
                            key={i}
                            type="radio"
                          
                            onChange={()=>handleChangeFactor(data.idFactorDeRiesgo,data.nombre)}
                        />
                    </>
                )
            })}
             <Button variant="primary" type="submit" block >Confirmar</Button>
        </Form>
       </>
    );
}else return <Redirect to="/"/>
      }
};

export default Ddjj;
