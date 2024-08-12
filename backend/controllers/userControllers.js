const asyncHandler = require("express-async-handler");
const User = require("../models/userModels.js")


const loginUser = asyncHandler(async(req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({message: "All fields required"})
  }

  const alreadyExists = await User.findOne({ email }).lean().exec();
  if (alreadyExists) {
    return res.status(200).json(alreadyExists)
  }
  const user = await User.create({ name, email })
  return res.json(user)
})

const updateUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(400).json({message: "User not found"})
  }

  user.name = name;
  const updatedUser = await user.save();
  return res.json(updatedUser);
})

module.exports = { loginUser, updateUser };