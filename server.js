const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = 7000;
const staticFilesPath = path.join(__dirname, '../server/client/build');

const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());



//use client app
app.use(express.static(staticFilesPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(staticFilesPath, 'index.html'));
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, 
  },
  password: String,
  // match: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/,
  email: {
    type: String,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    unique:true 
  },
  role: { type: String, default: 'user' }, 
});

const User = mongoose.model('User', userSchema);

// Register Route
app.post('/register', async (req, res) => {
  const { username, password, email, role, adminSecret } = req.body;

  try {
    // Additional security measure for admin registration
    if (role === 'admin') {
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).send('Unauthorized to create admin account');
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in MongoDB
    await User.create({ username, password: hashedPassword, email, role });

    console.log('User created');
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, JWT_SECRET);

    res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

// Define Product Schema
const productSchema = new mongoose.Schema({
  mobile_name:{
    type:String,
    unique:true,
  },
  brand: String,
  model: String,
  price: Number,
  quantity: Number,
});

const Product = mongoose.model('Product', productSchema);

// Add Mobile Route
app.post('/add-mobile', async (req, res) => {
  const { mobile_name, brand, model, price, quantity } = req.body;
  try {
    // Create new product in MongoDB
    await Product.create({ mobile_name, brand, model, price, quantity });

    console.log('Mobile added successfully');
    res.status(201).json({ success: true, message: 'Mobile added successfully' });
  } catch (error) {
    console.error('Error adding mobile:', error);
    res.status(500).json({ success: false, message: 'Error adding mobile' });
  }
});
// Paginate Products Route
app.get('/paginateProducts', async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;

    // Calculate the skip value based on the currentPage and pageSize
    const skip = (currentPage - 1) * pageSize;

    // Fetch paginated products from the MongoDB database
    const products = await Product.find().skip(skip).limit(pageSize);
    
    // Count total number of products
    const totalProducts = await Product.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / pageSize);

    // Send paginated products along with pagination metadata
    res.json({
      currentPage,
      pageSize,
      totalPages,
      totalProducts,
      products
    });
  } catch (error) {
    console.error('Error paginating products:', error);
    res.status(500).json({ success: false, message: 'Error paginating products' });
  }
});

// Search Products Route
app.get('/searchProducts', async (req, res) => {
  try {
    const searchQuery = req.query.search;
    
    // Search for products based on the search query
    const products = await Product.find({ mobile_name: { $regex: searchQuery, $options: 'i' } });
    
    res.json({ products });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ success: false, message: 'Error searching products' });
  }
});


app.delete('/deleteProduct/:mobileName', async (req, res) => {
  try {
    const mobileName = req.params.mobileName;
    console.log(mobileName)
    // Find the product by mobile_name and delete it
    const deletedProduct = await Product.findOneAndDelete({mobileName});
    if (deletedProduct) {
      res.status(200).send({ message: 'Product deleted successfully' });
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting the product:', error);
    res.status(500).send({ message: 'Error deleting the product' });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});