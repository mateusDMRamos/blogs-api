const UserService = require('../services/user.service');

const createNewUser = async (req, res) => {
  const newUser = req.body;
  const { status, message } = await UserService.setNewUser(newUser);
  if (status === 409) {
    return res.status(status).json({ message });
  }
  return res.status(status).json({ token: message });
};

const findAllUsers = async (_req, res) => {
  const users = await UserService.getAllUsers();
  return res.status(200).json(users);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await UserService.getById(id);
  if (status === 404) return res.status(status).json({ message });
  return res.status(status).json(message);
};

module.exports = {
  createNewUser,
  findAllUsers,
  findById,
};