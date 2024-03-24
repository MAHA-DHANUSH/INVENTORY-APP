const jwt = require('jsonwebtoken');
require('dotenv').config();


// Sample JWT token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTEyNzk2MjUsImV4cCI6MTcxMTI4MzIyNX0.nd5W0aQf_f-UO_0C7it1yAExL8ulFX3YNjFaANMPm6Q';

// Decode the token and access its payload
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    console.error('Error decoding token:', err);
    // Handle error
  } else {
    console.log('Decoded payload:', decoded);
    // Access the payload properties like decoded.username, decoded.role, etc.
  }
});
