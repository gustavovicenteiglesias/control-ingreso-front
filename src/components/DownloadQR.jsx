import React from "react";
import {Button,  Form} from "react-bootstrap";
import QRCode from "qrcode.react";
import './DownloadQR.css';



const QR=(props) =>{
  console.log(props.codeqr.qrAcceso)
  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    /*const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${props.codeqr.qrAcceso}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);*/
    //axios.get("http://microservicio-qr.herokuapp.com/fb25d73658c24eaeb3e4519bc24fd1f1/sistemas operativos/Juan Perez/Baradero/edificio principal/Gallo 550/aula 1/<fecha_hora>")
  };

  console.log(localStorage)
  const nombre =localStorage.getItem("nombre");
  const actividad=localStorage.getItem("actividad");
  const sede=localStorage.getItem("sede");
  const edificioDireccion=localStorage.getItem("edificioDireccion");
  const edificioNombre=localStorage.getItem("edificioNombre");
  const aula=localStorage.getItem("aula");
  const fecha=localStorage.getItem("fecha");
  const url ="http://microservicio-qr.herokuapp.com/fb25d73658c24eaeb3e4519bc24fd1f1/"+actividad+"/"+nombre+"/"+sede+"/"+edificioNombre+"/"+edificioDireccion+"/"+aula+"/"+fecha
  return (
    <div className="qrcontainer seccion-container mt-3 mb-3 mx-3">
      <h1>QR para entrar a tu actividad</h1>
      
      <QRCode
        id="qr-gen"
        value={props.codeqr.qrAcceso}
        size={290}
        level={"H"}
        includeMargin={true}
      />
      <p>Nombre : {nombre}</p>
      <p>Actividad : {actividad}</p>
      <p>Sede : {sede}</p>
      <p>Edificio : {edificioNombre}+{edificioDireccion}</p>
      <p>Aula : {aula}</p>
      

      <p>
       
        <Button className=" mt-3" variant="primary" >
         
         <a style={{color:"#ffffff"}} href={url} target="_black"> Descargar tu codigo QR </a>
        </Button>
      </p>
    </div>
  );
}
export default QR;
