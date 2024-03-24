import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './COMPONENTS/Register';
import Login from './COMPONENTS/Login';
import Home from './COMPONENTS/Home';
import AddProduct from './COMPONENTS/AddProduct';
import ProductList from './COMPONENTS/ProductList';
import Inventory from './COMPONENTS/Inventory';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-mobile" element={<AddProduct/>} />
          <Route path="/productList" element={<ProductList/>}/>
          <Route path="/" element={<Inventory/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
