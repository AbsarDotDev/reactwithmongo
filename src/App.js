import React, { Component }  from 'react';
  
import './App.css';
import { BrowserRouter as Router,  Route, Routes  } from "react-router-dom";
import Navb from './components/Navb';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <Router>
    <Navb/>
  
      <Routes>
  
      <Route exact path="/" element={<Home/>}/>    
      <Route exact path="/about" element={<About/>}/>    
  
        </Routes>
    </Router>

  );
}

export default App;
