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


const getMyProfile = async (
  userId
) => {
  return await User.findById(
    userId
  ).select("-password");
};

const updateProfile = async (
  userId,
  data
) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      name: data.name,
      mobileNo: data.mobileNo,
      address: data.address,
    },
    {
      new: true,
    }
  ).select("-password");
};

const updateProfilePhoto =
  async (
    userId,
    imageUrl,
    publicId
  ) => {
    return await User.findByIdAndUpdate(
      userId,
      {
        profileImage:
          imageUrl,

        profileImagePublicId:
          publicId,
      },
      {
        new: true,
      }
    ).select("-password");
  };

const deleteProfilePhoto =
  async (userId) => {
    return await User.findByIdAndUpdate(
      userId,
      {
        profileImage: "",
        profileImagePublicId:
          "",
      },
      {
        new: true,
      }
    );
  };

const changePassword =
  async (
    userId,
    oldPassword,
    newPassword
  ) => {
    const user =
      await User.findById(userId);

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    const isMatch =
      await bcrypt.compare(
        oldPassword,
        user.password
      );

    if (!isMatch) {
      throw new Error(
        "Old password is incorrect"
      );
    }

    user.password =
      await bcrypt.hash(
        newPassword,
        10
      );

    await user.save();

    return true;
  };

export default {
  createUser,
  getAllUsers,
  deleteUser,
  getUserById,
  getMyProfile,
  updateProfile,
  updateProfilePhoto,
  deleteProfilePhoto,
  changePassword
};