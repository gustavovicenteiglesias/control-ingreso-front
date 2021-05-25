import React from "react";
import {Button,  Form} from "react-bootstrap";
import QRCode from "qrcode.react";
import './DownloadQR.css';



const QR=(props) =>{
  console.log(props.codeqr.qrAcceso)
  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${props.codeqr.qrAcceso}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <div className="qrcontainer">
      <h1>QR para entrar a tu actividad</h1>
      
      <QRCode
        id="qr-gen"
        value={props.codeqr.qrAcceso}
        size={290}
        level={"H"}
        includeMargin={true}
      />
      <p>
       
        <Button className=" mt-3" variant="primary" onClick={downloadQRCode}>
          Descargar tu codigo QR 
        </Button>
      </p>
    </div>
  );
}
export default QR;
