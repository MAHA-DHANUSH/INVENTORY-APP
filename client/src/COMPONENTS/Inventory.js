import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Inventory.css'; // Import the CSS file

function Inventory() {
  return (
    <div className="bg-blue-200 min-h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col space-y-8">
          {/* First Container Box: Description */}
          <div className="p-6 rounded-lg bg-white shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-blue-600">INVENTORY MANAGEMENT SYSTEM</h1>
            <p className="text-lg text-gray-800">This is an inventory management system built with React, Tailwind CSS, Node.js, and MSSQL Server. It allows users to manage products and perform various operations.</p>
          </div>

          {/* Second Container Box: Tech Stack */}
          <div className="p-6 rounded-lg bg-white shadow-lg tech-stack"> {/* Apply the tech-stack class */}
            <h2 className="text-2xl font-bold mb-4">Tech Stack:</h2>
            <ul className="text-lg list-disc pl-8 text-gray-800">
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>Node.js</li>
              <li>MSSQL Server</li>
            </ul>
          </div>

          {/* Third Container Box: Functionality */}
          <div className="p-6 rounded-lg bg-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Functionality:</h2>
            <ul className="text-lg list-disc pl-8 text-gray-800">
              <li>Pagination</li>
              <li>Filter by product name</li>
              <li>Delete option using React icons</li>
            </ul>
          </div>

          {/* Registration Link */}
          <div className="p-6 rounded-lg bg-white shadow-lg">
            <p className="text-lg text-gray-800">Don't have an account? <Link to="/register" className="text-blue-600">Register here</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
