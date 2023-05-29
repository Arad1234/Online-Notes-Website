const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, required: true, minLength: 6 },
});

// I must use the "function" keyword in order to access the "this" object.
userSchema.pre("save", async function (next) {
  // Hashing the password before inserting the doc to the collection.
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
