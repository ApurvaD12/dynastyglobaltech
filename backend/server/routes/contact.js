const router = require('express').Router();
const Enquiry = require('../models/Enquiry');
const auth = require('../middleware/auth');

// POST /api/contact — public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name?.trim()) return res.status(400).json({ message: 'Full name is required' });
    if (!email?.trim()) return res.status(400).json({ message: 'Email is required' });
    if (!phone?.trim()) return res.status(400).json({ message: 'Phone number is required' });
    if (!message?.trim()) return res.status(400).json({ message: 'Message is required' });

    // Email validation
    const emailRx = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRx.test(email)) return res.status(400).json({ message: 'Please enter a valid email address' });

    // Phone validation — exactly 10 digits
    const phoneClean = phone.replace(/\s+/g, '');
    if (!/^\d{10}$/.test(phoneClean)) return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });

    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phoneClean,
      message: message.trim()
    });

    res.status(201).json({ message: 'Your enquiry has been submitted. We will contact you shortly.', enquiry });
  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// GET /api/contact — admin only
router.get('/', auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/contact/:id/status — admin
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(enquiry);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/contact/:id — admin
router.delete('/:id', auth, async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
