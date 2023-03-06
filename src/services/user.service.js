const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const getByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });

  return user;
};

const setNewUser = async (user) => {
  const { displayName, email, password, image } = user;
  const existingUser = await getByEmail(email);
  if (existingUser) {
    return ({ status: 409, message: 'User already registered' });
  }
  await User.create({ displayName, email, password, image });
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: { userEmail: user.email } }, secret, jwtConfig);
    return ({ status: 201, message: token });
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return users;
};

module.exports = {
  getByEmail,
  setNewUser,
  getAllUsers,
};