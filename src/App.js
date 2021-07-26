
import {Switch, Route} from 'react-router-dom'

import DatosPersonales from './components/DatosPersonales';
import Ddjj from './components/Ddjj';
import SolicitudQr from './components/SolicitudQR';
import DownloadQR from './components/DownloadQR';
import { Col, Navbar,Row } from "react-bootstrap";
import logolg from './Assest/unsada_logo_400.jpg';
import logomd from './Assest/Logo.png';
import facebook from './Assest/face.png';
import instagram from './Assest/instagram.png';
import './App.css';

function App() {
	return (
            <>
                  <Navbar  >
                        
                      <Navbar.Brand>
                            <div className="visible-lg" > <img alt="logo" src={logolg}  /></div>
                            <div className="visible-md"> <img alt="logo" src={logomd}   /></div>
                          
                           </Navbar.Brand>
                           <Navbar.Toggle />
                              <Navbar.Collapse className="justify-content-end mr-2">
                             
                              <a class="btn-icon active text-secondary " href="https://www.facebook.com/unsadaoficial/" target="_blank" rel="noopener noreferrer">
                              <img className="" alt='' src={facebook} width="40" height="40" />{' '}
                              </a>
                              <a class="btn-icon active text-secondary " href="https://www.instagram.com/unsadaoficial/" target="_blank" rel="noopener noreferrer" >
                              <img className="" alt='' src={instagram} width="40" height="40"/>{' '}
                              </a>
                            
                              </Navbar.Collapse>
                  </Navbar>
                  
                  <Switch>
                        <Route exact path="/" component={DatosPersonales}/>
                        <Route exact path="/ddjj" component={Ddjj}/>
                        <Route exact path="/solicitud" component={SolicitudQr}/>
                        <Route exact path="/qr" component={DownloadQR}/>
                  </Switch>
            </>
	);
}

export default App;