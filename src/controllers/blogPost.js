const BlogPostService = require('../services/post.service');

const getAllPosts = async (_req, res) => {
  const posts = await BlogPostService.findAllPosts();
  return res.status(200).json(posts);
};

const setNewPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;
  const { 
    status,
    message,
  } = await BlogPostService.createNewPost(title, content, categoryIds, userId);
  if (status === 400) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(message);
};

module.exports = {
  getAllPosts,
  setNewPost,
};