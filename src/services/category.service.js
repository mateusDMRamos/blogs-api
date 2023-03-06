const { Category } = require('../models');

const setNewCategory = async (categoryName) => {
  const category = await Category.create({ name: categoryName });
  return (category);
};

const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  setNewCategory,
  getCategories,
};