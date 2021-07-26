import React, {useState, useEffect,useRef} from "react";
import {Button, Col, Form} from "react-bootstrap";
import axios from "axios";
import "./Formulario.css";
import { Redirect } from "react-router";
import swal from 'sweetalert';

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
    const resp=[]
    const inputRef = useRef([]);
    
    const [preguntas, setPreguntas] = useState([]);
    const [factorDeRiesgoData, setFactorDeRiesgoData] = useState([]);
    const [isSubmitting,setIsSubmitting]=useState(false)
  
    const [redirect,setRedirect]=useState(false);
    const [redirectPersonales,setRedirectPersonales]=useState(false);
    
    const handleSubmit = (event) => {
       const leyenda=" Asimismo, declaro bajo juramento que si presento uno o más síntomas compatibles con infección por Coronavirus COVID-19, y/o mantuve contacto estrecho con casos sospechosos y/o confirmados, me comunicaré telefónicamente al 107 (si vivo en Ciudad Autónoma de Buenos Aires) o al 148 (si vivo en Provincia de Buenos Aires), como indica el MINISTERIO DE SALUD DE LA NACIÓN.  "
        inputRef.current.map((data,i)=>{
            
            if(!data.checked){
               
                swal("",leyenda,"error")
                .then((res)=>{
                    setRedirectPersonales(true)
                    window.location.reload();})
                return null
              
            }else{
               
                return(
                    resp.push({
                        pregunta:{
                            idPregunta:i+1
                        },
                        afirmativo: !data.checked
                    }))}})
        
        
       
        event.preventDefault();
        if (resp.length === 5) {
            setIsSubmitting(true);
            const ddjj={
                respuestas:resp,
                factorDeRiesgo:[],
                fecha:date
            }
            console.log("respuesta",resp)
            axios.post("http://areco.gob.ar:9528/api/ddjj/crear/"+localStorage.getItem("id_persona"),ddjj)
            .then((resp)=>{
                setIsSubmitting(false);
                console.log("success")
                console.log(resp.data.data)
                localStorage.setItem("ddjj", resp.data.data)
                console.log("ddjj",localStorage.getItem("ddjj"))
                setRedirect(true);
            })
            .catch((error)=>{console.log(error); setIsSubmitting(false);})
            
        }else{
            
            setRedirectPersonales(true)
            

        }
        
       
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
    /*useEffect(() => {
        setDdjj({
            fecha,
            factorDeRiesgo,
            respuestas,
        })
        
    }, [fecha,factorDeRiesgo,respuestas])*/
   /* useEffect(() => {
        if (typeof fecha !== undefined && respuestas.length !== 0) {
            postDdjj(ddjj)
        } 
    }, [fecha,ddjj,respuestas])*/
    console.log(localStorage.getItem("id_persona"))
    console.log(localStorage.getItem("nombre"))


    if (redirect) {
        return <Redirect to="/solicitud"/>
      }else if(redirectPersonales){
        <Redirect to="/"/>
      }
      else{
    if (localStorage.getItem("id_persona")!==null) {
    return (
        
        <>
        <Form className=" mb-3" onSubmit={handleSubmit}>
        <div className="seccion-container mx-3 mt-3">
            <h2 className="subtitulo">Declaración Jurada</h2>
            <h3 className="subtitulo">{localStorage.getItem("nombre")}</h3>
            <Col style={{textAlign:"justify"}}>
                <p>
                Declaro bajo juramento que los datos que consigno en este formulario son reales y 
                completos sin omitir ni falsear ninguno. 
                Asimismo, declaro bajo juramento entender y aceptar los términos para acceder a las 
                actividades de la <strong>UNSADA</strong>:
                </p>
                <p>
                Asimismo, declaro bajo juramento que si presento uno o más síntomas compatibles con 
                infección por Coronavirus COVID-19, y/o mantuve contacto estrecho con casos 
                sospechosos y/o confirmados, me comunicaré telefónicamente al 107 
                (si vivo en Ciudad Autónoma de Buenos Aires) o al 148 (si vivo en Provincia de 
                Buenos Aires), como indica el <strong>MINISTERIO DE SALUD DE LA NACIÓN</strong>.   
                </p>
                <p>
                Además, daré inmediato aviso al personal de la <strong>UNSADA</strong>, 
                enviando un correo electrónico a 
                <a style={{color: '#000000'}}  href="mailto: contacto.unsada.edu.ar"> contacto.unsada.edu.ar</a>
               , o telefónicamente a los 
                número 2326-421167
                </p>
            </Col>
            {preguntas.map((pregunta, i) => {
                return (
                    <div  key={i}>
                        <Form.Label  className="label-preguntas mt-3">{pregunta.descripcion+"  *"}</Form.Label>
                        
                        <Form.Check
                           ref = {el => inputRef.current[i] = el}
                            required
                            xs={6}
                            name={"pregunta"+(i+1)}
                            label="Si"
                           
                            type="radio"
                           
                           
                        />
                        
                        <Form.Check
                           ref = {el => inputRef.current[i] = el}
                          required
                            xs={6}
                            name={"pregunta"+(i+1)}
                            label="No"
                           type="radio"
                         />
                     </div>
                );
            })}
           
         </div>
      <div className="seccion-container mx-3 mt-3">
         {/* <h2 className="subtitulo">¿Posee alguno de los siguientes factores de riesgo?  </h2>
            {factorDeRiesgoData.map((data,i)=>{
                return(
                    <>
                    <Form.Label key={10+i} className="label-preguntas mt-3">{data.nombre}</Form.Label>
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
            })}*/}
             <Button variant="primary" type="submit" block disabled={isSubmitting}> {isSubmitting ? 'Confirmando' : 'Confirmar'}</Button>
            </div>
        </Form>
       </>
    );
}else return <Redirect to="/"/>
      }
};

export default Ddjj;
