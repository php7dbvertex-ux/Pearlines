import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import cloudinary from "../config/cloudinary.js";

// Admin Login
export const adminLogin = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    const admin =
      await Admin.findOne({
        email,
      });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const adminData =
      admin.toObject();

    delete adminData.password;

    res.json({
      success: true,
      token,
      admin: adminData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Admin Profile
export const getProfile = async (
  req,
  res
) => {
  try {
    const admin =
      await Admin.findById(
        req.admin.id
      ).select("-password");

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Profile
export const updateProfile =
  async (req, res) => {
    try {
      const {
        name,
        mobileNo,
      } = req.body;

      const admin =
        await Admin.findByIdAndUpdate(
          req.admin.id,
          {
            name,
            mobileNo,
          },
          {
            new: true,
          }
        ).select("-password");

      res.json({
        success: true,
        message:
          "Profile updated successfully",
        data: admin,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Change Password
export const changePassword =
  async (req, res) => {
    try {
      const {
        oldPassword,
        newPassword,
      } = req.body;

      const admin =
        await Admin.findById(
          req.admin.id
        );

      const isMatch =
        await bcrypt.compare(
          oldPassword,
          admin.password
        );

      if (!isMatch) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Old password is incorrect",
          });
      }

      admin.password =
        await bcrypt.hash(
          newPassword,
          10
        );

      await admin.save();

      res.json({
        success: true,
        message:
          "Password changed successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Upload Profile Photo
export const updateProfilePhoto =
  async (req, res) => {
    try {
      const admin =
        await Admin.findById(
          req.admin.id
        );

      if (
        admin.profileImagePublicId
      ) {
        await cloudinary.uploader.destroy(
          admin.profileImagePublicId
        );
      }

      const result =
        await cloudinary.uploader.upload(
          req.file.path,
          {
            folder:
              "pearlline/admin",
          }
        );

      admin.profileImage =
        result.secure_url;

      admin.profileImagePublicId =
        result.public_id;

      await admin.save();

      res.json({
        success: true,
        message:
          "Profile photo updated",
        data: {
          profileImage:
            admin.profileImage,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Delete Profile Photo
export const deleteProfilePhoto =
  async (req, res) => {
    try {
      const admin =
        await Admin.findById(
          req.admin.id
        );

      if (
        admin.profileImagePublicId
      ) {
        await cloudinary.uploader.destroy(
          admin.profileImagePublicId
        );
      }

      admin.profileImage = "";
      admin.profileImagePublicId =
        "";

      await admin.save();

      res.json({
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

// Get All Users
export const getAllUsers =
  async (req, res) => {
    try {
      const users =
        await User.find({})
          .select(
            "-password"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        count:
          users.length,
        users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Delete User
export const deleteUser =
  async (req, res) => {
    try {
      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };