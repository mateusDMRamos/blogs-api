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

module.exports = {
  createNewUser,
  findAllUsers,
};