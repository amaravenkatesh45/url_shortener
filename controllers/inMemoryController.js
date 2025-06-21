const { validationResult } = require('express-validator');
const validUrl = require('valid-url');
const shortid = require('shortid');

// In-memory storage
const urlDatabase = new Map();

// @desc    Shorten URL
// @route   POST /api/shorten
// @access  Public
exports.shortenUrl = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { longUrl } = req.body;

    // Check if URL is valid
    if (!validUrl.isUri(longUrl)) {
      return res.status(400).json({ success: false, error: 'Invalid URL' });
    }

    // Check if URL already exists
    for (const [code, data] of urlDatabase.entries()) {
      if (data.originalUrl === longUrl) {
        return res.status(200).json({
          success: true,
          originalUrl: longUrl,
          shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${code}`,
          urlCode: code,
          createdAt: data.createdAt
        });
      }
    }

    // Generate short code
    const urlCode = shortid.generate();
    const shortUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/${urlCode}`;
    const now = new Date();

    // Store in memory
    urlDatabase.set(urlCode, {
      originalUrl: longUrl,
      shortUrl,
      clicks: 0,
      createdAt: now,
      lastAccessed: now
    });

    res.status(201).json({
      success: true,
      originalUrl: longUrl,
      shortUrl,
      urlCode,
      createdAt: now
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Redirect to original URL
// @route   GET /:code
// @access  Public
exports.redirectToOriginalUrl = async (req, res) => {
  try {
    const { code } = req.params;
    const urlData = urlDatabase.get(code);

    if (!urlData) {
      return res.status(404).json({ success: false, error: 'URL not found' });
    }

    // Update stats
    urlData.clicks += 1;
    urlData.lastAccessed = new Date();
    urlDatabase.set(code, urlData);

    // Redirect to original URL
    res.redirect(urlData.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Get URL stats
// @route   GET /api/:code/stats
// @access  Public
exports.getUrlStats = async (req, res) => {
  try {
    const { code } = req.params;
    const urlData = urlDatabase.get(code);

    if (!urlData) {
      return res.status(404).json({ success: false, error: 'URL not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        originalUrl: urlData.originalUrl,
        shortUrl: urlData.shortUrl,
        clicks: urlData.clicks,
        createdAt: urlData.createdAt,
        lastAccessed: urlData.lastAccessed
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
