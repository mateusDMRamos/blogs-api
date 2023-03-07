const jwt = require('jsonwebtoken');
require('dotenv/config');
const userService = require('../services/user.service');

const secret = process.env.JWT_SECRET;

const validateName = (name) => name.length > 7;

const validateEmail = (email) => {
  if (email.match(/^\S+@\S+\.\S+$/)) return true;
  return false;
};

const validatePassword = (password) => password.length > 5;

const validateNewUser = (req, res, next) => {
  const user = req.body;
  if (!validateName(user.displayName)) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long' });
  }
  if (!validateEmail(user.email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (!validatePassword(user.password)) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long' });
  }
  next();
};
// pedaço de código retirado de : https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/85fd2ed3-f6cc-4789-8990-7f5fe827422c/lesson/71107d81-f5bd-44ac-8bfb-5d5b0908cb0e
const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const verified = jwt.verify(token, secret);
    const user = await userService.getByEmail(verified.data.userEmail);
    req.user = user;
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  
  next();
};

module.exports = {
  validateNewUser,
  validateJWT,
};