import User from "../models/user.model.js"
import bcrypt from "bcryptjs";

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
};
const getAllUsers = async () => {
  return await User.find().sort({
    createdAt: -1,
  });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const getUserById = async (id) => {
  return await User.findById(id);
};

export default {
  createUser,
  getAllUsers,
  deleteUser,
  getUserById,
};