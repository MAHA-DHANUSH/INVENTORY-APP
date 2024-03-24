import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-8">Welcome to the Inventory Page</h1>
        <div className="mb-4">
          <Link
            to="/add-mobile"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            Add Product
          </Link>
        </div>
        <div>
          <Link
            to="/productList"
            className="inline-block px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
