const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (unHashedPassword) => {
  return await bcrypt.hash(unHashedPassword, Number("12con6x7393"));
};

const comparePasswords = async (unHashedPassword, hashedPassword) => {
  return await bcrypt.compare(unHashedPassword, hashedPassword);
};

const generateTokens = (user) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      userId: user._id,
      exp: exp.getTime() / 1000,
    },
    process.env.JWT_SECRET
  );
};

const verifyToken = (token) => {
  const { userId } = jwt.verify(token, process.env.JWT_SECRET);
  return userId;
};

module.exports = {
  hashPassword,
  comparePasswords,
  generateTokens,
  verifyToken,
};
