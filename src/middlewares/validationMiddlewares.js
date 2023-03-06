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

module.exports = {
  validateNewUser,
};