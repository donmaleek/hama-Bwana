const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const propertyRouter = require('./routes/property');
const { authenticate, generateToken } = require('./middleware/auth');
const User = require('./models/User');
const Property = require('./models/Property');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/users', userRouter);
app.use('/properties', propertyRouter);

// User registration route with profile picture upload
app.post('/register', upload.single('profilePicture'), async (req, res) => {
  const { name, email, description, password } = req.body;

  // Check for missing required fields
  const missingFields = [];
  if (!name) missingFields.push('name');
  if (!email) missingFields.push('email');
  if (!description) missingFields.push('description');
  if (!password) missingFields.push('password');

  if (missingFields.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', missingFields, requestBody: req.body });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

    // Create a new user
    const user = new User({ name, email, description, password, profilePicture });
    await user.save();

    res.redirect('/login'); // Redirect to login after registration
  } catch (err) {
    console.error('Error saving user to database:', err);

    // Handle specific MongoDB duplicate key error (email already exists)
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // General server error
    res.status(500).send('Server error during registration');
  }
});

// User login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.validatePassword(password))) {
      console.error(`Invalid credentials for email: ${email}`); // Log invalid credentials
      return res.status(401).send('Invalid credentials');
    }

    // Generate and return a token, then redirect to profile
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/profile');
  } catch (err) {
    console.error('Error during login:', err); // Log the error
    res.status(500).send('Server error during login');
  }
});

// Fetch user profile and rentals
app.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const rentals = await Property.find({ user: req.user.id });

    res.json({ user, rentals });
  } catch (err) {
    console.error('Error fetching profile:', err); // Log the error
    res.status(500).send('Server error fetching profile');
  }
});

// Publish a new rental
app.post('/properties', authenticate, upload.array('pictures'), async (req, res) => {
  const { name, price, description, video } = req.body;

  // Check for missing required fields
  const missingFields = [];
  if (!name) missingFields.push('name');
  if (!price) missingFields.push('price');
  if (!description) missingFields.push('description');

  if (missingFields.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', missingFields, requestBody: req.body });
  }

  try {
    const pictures = req.files.map(file => `/uploads/${file.filename}`);

    // Create a new property
    const property = new Property({ name, price, description, pictures, video, user: req.user.id });
    await property.save();

    res.json({ message: 'Property published successfully' });
  } catch (err) {
    console.error('Error publishing property:', err); // Log the error
    res.status(500).send('Server error during property publishing');
  }
});

// Database connection
mongoose.connect('mongodb://localhost:27017/hama_bwana')
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Could not connect to MongoDB', err); // Log the error
  process.exit(1);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send('Something broke!');
});
