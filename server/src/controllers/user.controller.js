/**
 * Module dependencies.
 */
const { User } = require("../models");
const { authService } = require("../services");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json("Server internal error!");
  }
};

const updateUser = async (req, res) => {
  const { id, fullname, username, email, password, admin } = req.body;

  try {
    const user = await User.findById(id);

    if (user) {
      const hashed = await authService.hashedPassword(password);

      Object.assign(user, {
        fullname,
        username,
        email,
        password: hashed,
        admin,
      });
      await user.save();

      return res.status(200).json({ msg: "User has updated", user });
    } else {
      return res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    return res.status(500).json("Server internal error!");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      await User.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ message: "User has deleted successfully!" });
    } else {
      return res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    return res.status(500).json("Server internal error!");
  }
};

module.exports = { getUsers, updateUser, deleteUser };
