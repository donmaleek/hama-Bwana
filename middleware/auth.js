// auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path if necessary

const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id, // Assuming your user object has an id field
      // Add any other relevant user information you want to include in the token payload
    }
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust expiration as needed
};

const authenticate = (req, res, next) => {
  // Get token from cookies or headers
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set req.user to the decoded user object
    req.user = decoded.user;

    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ error: 'Token verification failed' });
  }
};

module.exports = {
  generateToken,
  authenticate
};
