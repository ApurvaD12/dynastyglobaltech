const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true },
  heading: { type: String, default: '' },
  subheading: { type: String, default: '' },
  body: { type: String, default: '' },
  ctaText: { type: String, default: '' },
  certifications: [{ url: String, name: String }]
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
