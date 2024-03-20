import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/signup'; // Corrected filename
import SignIn from './components/singin'; // Corrected filename
import Product from './components/product'; // Corrected filename
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Categories from './components/categories'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/eshop/signin' element={<SignIn/>} />
      <Route path='/eshop/signup' element={<Signup/>} />
      <Route path='/eshop/product' element={<Product/>} />
      <Route path='eshop/products/:id' element={<Categories/>}/>
    </Routes>
  );
}

export default App;
