const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
  shortenUrl, 
  redirectToOriginalUrl, 
  getUrlStats 
} = require('../controllers/inMemoryController');

// Route to create a short URL
router.post(
  '/shorten',
  [
    body('longUrl', 'Please include a valid URL').isURL(),
  ],
  shortenUrl
);

// Route to redirect to original URL
router.get('/:code', redirectToOriginalUrl);

// Route to get URL stats
router.get('/:code/stats', getUrlStats);

module.exports = router;