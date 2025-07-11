const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const router = express.Router();

// Create post
router.post("/", auth, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const post = new Post({
      user: req.user.id,
      title,
      content,
      tags,
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get all posts by user
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Update post
router.put("/:id", auth, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    let post = await Post.findOne({ _id: req.params.id, user: req.user.id });
    if (!post) return res.status(404).json({ msg: "Post not found" });

    post.title = title;
    post.content = content;
    post.tags = tags;
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Delete post
router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!post) return res.status(404).json({ msg: "Post not found" });

    res.json({ msg: "Post removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
