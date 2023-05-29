const bcrypt = require("bcrypt");
const UserModel = require("../models/userSchema");
const generateToken = require("../utils/generateToken");

async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const newUser = await UserModel.create({
      name: name,
      email: email,
      password: password,
    });

    const token = generateToken({ userId: newUser._id, email: newUser.email });
    res.json({ status: "ok", token: token });
  } catch (error) {
    res.json({ status: error });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });
  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const token = generateToken({ userId: user._id, email: user.email });
      res.json({ status: "ok", token: token });
    } else {
      res.json({ status: "Unauthorized!" });
    }
  } else {
    res.json({ status: "Unauthorized!" });
  }
}

module.exports = { register, login };
