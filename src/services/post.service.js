const { BlogPost, User, Category } = require('../models');

const findAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    ],
  });
  return posts;
};

module.exports = {
  findAllPosts,
};