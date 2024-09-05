// App.js
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';


function Rotas() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
