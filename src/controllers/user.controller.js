import userService from "../services/user.service.js";
import uploadService from "../services/upload.service.js";

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getMyProfile = async (
  req,
  res
) => {
  try {
    const user =
      await userService.getMyProfile(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateProfile = async (
  req,
  res
) => {
  try {
    const user =
      await userService.updateProfile(
        req.user.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateProfilePhoto =
  async (req, res) => {
    try {
      const result =
        await uploadService.uploadImage(
          req.file.path,
          "profile"
        );

      const user =
        await userService.updateProfilePhoto(
          req.user.id,
          result.imageUrl
        );

      res.status(200).json({
        success: true,
        message:
          "Profile photo updated",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


  const deleteProfilePhoto =
  async (req, res) => {
    try {
      await userService.deleteProfilePhoto(
        req.user.id
      );

      res.status(200).json({
        success: true,
        message:
          "Profile photo deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };



  const changePassword =
  async (req, res) => {
    try {
      const {
        oldPassword,
        newPassword,
      } = req.body;

      await userService.changePassword(
        req.user.id,
        oldPassword,
        newPassword
      );

      res.status(200).json({
        success: true,
        message:
          "Password changed successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
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