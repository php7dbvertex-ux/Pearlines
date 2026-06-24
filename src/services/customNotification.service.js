import CustomNotification from "../models/customNotification.model.js";
import User from "../models/user.model.js";

const createCustomNotification = async (data) => {
  const {
    userId,
    title,
    message,
    imageUrl,
    publicId,
  } = data;

  if (!userId) {
    throw new Error("User is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const notification =
    await CustomNotification.create({
      userId,
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