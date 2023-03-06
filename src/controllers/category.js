const CategoryService = require('../services/category.service');

const addNewCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  const category = await CategoryService.setNewCategory(name);
  return res.status(201).json(category);
};

const getAllCategories = async (_req, res) => {
  const categories = await CategoryService.getCategories();
  return res.status(200).json(categories);
};

module.exports = {
  addNewCategory,
  getAllCategories,
};