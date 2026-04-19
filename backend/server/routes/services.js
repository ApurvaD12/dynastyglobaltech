const router = require('express').Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// GET /api/services — public
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/services/:slug — public
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/services — admin
router.post('/', auth, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/services/:id — admin
router.put('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/services/:id — admin
router.delete('/:id', auth, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
