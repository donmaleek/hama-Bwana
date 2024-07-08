const User = require('../models/User');
const { generateToken } = require('../middleware/auth'); // Import generateToken

const registerUser = async (req, res) => {
  try {
    const { name, email, description, password } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

    const user = new User({ name, email, description, password, profilePicture });
    await user.save();
    
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error during registration');
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await user.validatePassword(password)) {
      return res.status(401).send('Invalid credentials');
    }

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error during login');
  }
};

module.exports = { registerUser, loginUser };
