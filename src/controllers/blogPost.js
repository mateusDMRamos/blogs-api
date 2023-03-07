const BlogPostService = require('../services/post.service');

const getAllPosts = async (_req, res) => {
  const posts = await BlogPostService.findAllPosts();
  return res.status(200).json(posts);
};

module.exports = {
  getAllPosts,
};