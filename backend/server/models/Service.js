const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  benefits: [{ type: String }],
  techStack: [{ type: String }],
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
