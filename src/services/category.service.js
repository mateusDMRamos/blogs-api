const { Category } = require('../models');

const setNewCategory = async (categoryName) => {
  const category = await Category.create({ name: categoryName });
  return (category);
};

module.exports = {
  setNewCategory,
};