const jwt = require("jsonwebtoken");

const generateToken = (userData) => {
  const token = jwt.sign(userData, process.env.SECRET_KEY);
  return token;
};

module.exports = generateToken;
