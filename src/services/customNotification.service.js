import CustomNotification from "../models/customNotification.model.js";
import User from "../models/user.model.js";

const createCustomNotification = async (data) => {
  const { email, mobileNo, title, message, imageUrl, publicId } = data;

  if (!email && !mobileNo) {
    throw new Error("Email or Mobile No is required to find the user");
  }

  const query = [];
  if (email) query.push({ email: email.toLowerCase().trim() });
  if (mobileNo) query.push({ mobileNo: mobileNo.trim() });

  const user = await User.findOne({ $or: query });

  if (!user) {
    throw new Error("User not found with given email/mobile number");
  }

  const notification = await CustomNotification.create({
    userId: user._id,
    title,
    message,
    imageUrl,
    publicId,
  });

  return notification;
};

// Admin: see all notifications sent (to any user)
const getAllCustomNotifications = async () => {
  return await CustomNotification.find()
    .populate("userId", "name email mobileNo")
    .sort({ createdAt: -1 });
};

// User: get only their own notifications
const getUserNotifications = async (userId) => {
  return await CustomNotification.find({ userId }).sort({ createdAt: -1 });
};

const deleteCustomNotification = async (id) => {
  return await CustomNotification.findByIdAndDelete(id);
};

export default {
  createCustomNotification,
  getAllCustomNotifications,
  getUserNotifications,
  deleteCustomNotification,
};