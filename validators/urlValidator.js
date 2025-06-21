const { body, validationResult } = require('express-validator');
const validUrl = require('valid-url');

const validateUrl = [
  body('longUrl')
    .trim()
    .notEmpty().withMessage('URL is required')
    .custom(value => {
      if (!validUrl.isWebUri(value)) {
        throw new Error('Invalid URL format');
      }
      return true;
    }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array().map(err => err.msg) 
      });
    }
    next();
  }
];

module.exports = { validateUrl };
