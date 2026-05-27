const Post = require('../models/Post');
const cloudinary = require('../utils/cloudinary');

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    let imageUrl = '';

    // Upload image if provided
  if (req.file) {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "vibesphere/posts",
  });

  imageUrl = result.secure_url;
}

    const post = await Post.create({
      title,
      content,
      image: imageUrl,
      author: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Post published successfully! 🎉",
      post
    });
  } catch (error) {
    console.error("Cloudinary Error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load posts" });
  }
};

module.exports = { createPost, getAllPosts };