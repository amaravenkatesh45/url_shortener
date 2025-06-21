const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true
  },
  urlCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 30*24*60*60*1000) // 30 days from now
  },
  clicks: {
    type: Number,
    default: 0
  },
  lastAccessed: {
    type: Date
  }
});

// Index for faster querying
urlSchema.index({ urlCode: 1 });
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Url', urlSchema);
