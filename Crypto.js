const crypto = require('crypto');

// Generate a random secret key
const secret = crypto.randomBytes(32).toString('hex');
console.log('JWT_SECRET:', secret);
