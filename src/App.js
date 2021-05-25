
import {Switch, Route} from 'react-router-dom'

import DatosPersonales from './components/DatosPersonales';
import Ddjj from './components/Ddjj';
import SolicitudQr from './components/SolicitudQR';
import DownloadQR from './components/DownloadQR';
import './App.css';

function App() {
	return (
		
                  <Switch>
                        <Route exact path="/" component={DatosPersonales}/>
                        <Route exact path="/ddjj" component={Ddjj}/>
                        <Route exact path="/solicitud" component={SolicitudQr}/>
                        <Route exact path="/qr" component={DownloadQR}/>
                  </Switch>
            
	);
}

export default App;