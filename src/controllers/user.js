const UserService = require('../services/user.service');

const createNewUser = async (req, res) => {
  const newUser = req.body;
  const { status, message } = await UserService.setNewUser(newUser);
  if (status === 409) {
    return res.status(status).json({ message });
  }
  return res.status(status).json({ token: message });
};

module.exports = {
  createNewUser,
};