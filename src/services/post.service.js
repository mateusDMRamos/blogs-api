const { BlogPost, User, Category, PostCategory } = require('../models');

const findAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    ],
  });
  return posts;
};

const createNewPost = async (title, content, categoryIds, userId) => {
  const allCategories = await Category.findAll({ attributes: ['id'] });
  const validCategories = allCategories.filter((category) => categoryIds.includes(category.id));
  if (validCategories.length !== categoryIds.length) {
    return { status: 400, message: 'one or more "categoryIds" not found' };
  }
  const newPost = await BlogPost.create({ title, content, userId });

  const postCategories = categoryIds.map((category) => ({ 
    postId: newPost.id,
    categoryId: category, 
  }));
  await PostCategory.bulkCreate([...postCategories]);
  return { status: 201, message: newPost };
};

const getById = async (postId) => {
  const post = await BlogPost.findByPk(postId, {
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    ],
  });
  if (!post) return ({ status: 404, message: 'Post does not exist' });
  return { status: 200, message: post };
};

module.exports = {
  findAllPosts,
  createNewPost,
  getById,
};