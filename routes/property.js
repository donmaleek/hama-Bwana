const express = require('express');
const router = express.Router();
const { publishProperty, getProperties } = require('../controllers/propertyController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, publishProperty);
router.get('/', getProperties);

module.exports = router;
