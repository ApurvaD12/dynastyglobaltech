const router = require('express').Router();
const Content = require('../models/Content');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads dir exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `cert_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
  }
});

// GET /api/content/:section — public
router.get('/:section', async (req, res) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    if (!content) return res.status(404).json({ message: 'Content not found' });
    res.json(content);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/content/:section — admin
router.put('/:section', auth, async (req, res) => {
  try {
    const content = await Content.findOneAndUpdate(
      { section: req.params.section },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(content);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/content/about/certifications — admin
router.post('/about/certifications', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const url = `/uploads/${req.file.filename}`;
    const name = req.body.name || req.file.originalname;
    const content = await Content.findOneAndUpdate(
      { section: 'about' },
      { $push: { certifications: { url, name } } },
      { new: true, upsert: true }
    );
    res.json({ url, name, content });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/content/about/certifications/:filename — admin
router.delete('/about/certifications/:filename', auth, async (req, res) => {
  try {
    const url = `/uploads/${req.params.filename}`;
    await Content.findOneAndUpdate(
      { section: 'about' },
      { $pull: { certifications: { url } } }
    );
    const filePath = path.join(uploadDir, req.params.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.json({ message: 'Certification removed' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
