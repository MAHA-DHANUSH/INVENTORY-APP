// AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AddProduct.css'; // Import custom CSS file

function AddProduct() {
  const [mobileName, setMobileName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMobileNameChange = (e) => {
    setMobileName(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/add-mobile', {
        mobile_name: mobileName,
        brand: brand,
        model: model,
        price: price,
        quantity: quantity
      });
      console.log('Mobile added successfully');

      // setMobileName('');
      // setBrand('')
      // setModel('')
      // setPrice('')
      // setQuantity('')
     
    } catch (error) {
      console.error('Error adding mobile:', error);
     
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <center>

      
    <div className='title'>
    <div className="container bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mobile Name:</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            value={mobileName}
            onChange={handleMobileNameChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Brand:</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            value={brand}
            onChange={handleBrandChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Model:</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            value={model}
            onChange={handleModelChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Quantity:</label>
          <input
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            value={quantity}
            onChange={handleQuantityChange}
            required
          />
        </div>
        <button type="submit" className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add Product</button>
      </form>
      <button onClick={toggleDropdown} className="mt-4 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md">Toggle Dropdown</button>
      <div className={`dropdown ${isDropdownOpen ? 'show-dropdown' : ''}`}>
      
        <Link to="/productList">ProductLIST</Link>
      </div>
    </div>
    </div>
    </center>
    </div>
  );
}

export default AddProduct;
