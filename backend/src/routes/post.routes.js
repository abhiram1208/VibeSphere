const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createPost, getAllPosts } = require('../controllers/post.controller');
const { protect } = require('../middleware/auth');

const upload = multer({ dest: 'uploads/' });

// Public Route
router.get('/', getAllPosts);

// Protected Route
router.post('/', protect, upload.single('image'), createPost);

module.exports = router;