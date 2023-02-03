import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Connexion from './pages/connexion/Connexion';
import Deconnexion from './pages/deconnexion/Deconnexion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/connexion" element={<Connexion />}></Route>
        <Route path="/deconnexion" element={<Deconnexion />}></Route>
      </Routes>
    </Router>
  );
}

export default App;