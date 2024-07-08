const Property = require('../models/Property');

const publishProperty = async (req, res) => {
  try {
    const { name, price, description, video } = req.body;
    const pictures = req.files.map(file => `/uploads/${file.filename}`);

    const property = new Property({ name, price, description, pictures, video, user: req.user.id });
    await property.save();

    res.json({ message: 'Property published successfully' });
  } catch (err) {
    console.error('Error publishing property:', err);
    res.status(500).send('Server error during property publishing');
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('user', 'name email');
    res.json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).send('Server error fetching properties');
  }
};

module.exports = { publishProperty, getProperties };
