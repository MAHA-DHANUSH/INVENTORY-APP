import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import './ProductList.css'
import { Link } from 'react-router-dom';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // You can also make this dynamic
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from your API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/paginateProducts?page=${currentPage}&pageSize=${pageSize}`);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [currentPage, pageSize]);

  // Handler for page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const deleteProduct = async (mobile_name) => {
    try {
      await axios.delete(`http://localhost:7000/deleteProduct/${mobile_name}`);
      // Fetch the updated product list after deletion
      const response = await axios.get(`http://localhost:7000/paginateProducts?page=${currentPage}&pageSize=${pageSize}`);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  // Handler for search submit
  const handleSearchSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/searchProducts?search=${searchTerm}`);
      setProducts(response.data.products);
      setTotalPages(1); // Reset total pages as we're showing search results on one page only
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

 // Handler for deleting a product


  return (
    <div>
      <center>
        <div className='title'>
        <h1>PRODUCT LIST</h1>
        </div>
       
    <div className="container mx-auto">
      <div className="flex justify-end mb-4">
       
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-2 py-1 mr-2"
        />
        <button
          onClick={handleSearchSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
        >
          Search
        </button>
      </div>
      <h2 className="text-2xl mb-4">Products</h2>
      <table className="table-auto w-full border border-blue-500">
        <thead>
          <tr className="bg-blue-200">
            <th className="border border-blue-500 px-4 py-2">Name</th>
            <th className="border border-blue-500 px-4 py-2">Brand</th>
            <th className="border border-blue-500 px-4 py-2">Model</th>
            <th className="border border-blue-500 px-4 py-2">Price</th>
            <th className="border border-blue-500 px-4 py-2">Quantity</th>
            {/* <th className="border border-blue-500 px-4 py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.RowNum} className="hover:bg-blue-100">
              <td className="border border-blue-500 px-4 py-2">{product.mobile_name}</td>
              <td className="border border-blue-500 px-4 py-2">{product.brand}</td>
              <td className="border border-blue-500 px-4 py-2">{product.model}</td>
              <td className="border border-blue-500 px-4 py-2">${product.price}</td>
              <td className="border border-blue-500 px-4 py-2">{product.quantity}</td>
              <td className="border border-blue-500 px-4 py-2">
              <FaTrash onClick={() => deleteProduct(product.mobile_name)} className="cursor-pointer text-red-500 hover:text-red-700" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            disabled={currentPage === i + 1}
            className={`px-3 py-1 mx-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-500 hover:text-white'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
          <Link to="/add-mobile">Add Product</Link>
        </button>
    </center>
    </div>
  );
};

export default ProductList;
