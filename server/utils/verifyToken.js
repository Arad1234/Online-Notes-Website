const jwt = require("jsonwebtoken");
const verifyToken = async (token) => {
  try {
    await jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.log(error);
    throw new Error("Authorization error");
  }
};

module.exports = verifyToken;
