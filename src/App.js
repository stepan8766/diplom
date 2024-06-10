import React from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter} from 'react-router-dom'
import Approuter from './components/Approuter';
import NetworkList from './components/NetworkList';
import "./styles/AppContainer.css" 

function App() {
  return (
     <BrowserRouter>
        <Navbar/>
        <Approuter/>
        <NetworkList/>
     </BrowserRouter> 
  );
}

export default App;
