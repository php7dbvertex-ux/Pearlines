import Notification from "../models/notification.model.js";
import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import firebaseService from "../services/firebase.service.js";
// Create Notification




const createNotification = async (notificationData) => {
  // Save notification in MongoDB
  const notification = await Notification.create(notificationData);

  try {
    // Get all users having FCM token
    const users = await User.find({
      fcmToken: {
        $exists: true,
        $ne: "",
      },
    });

    // Send push notification to every user
    for (const user of users) {
      await firebaseService.sendPushNotification({
        token: user.fcmToken,
        title: notification.title,
        body: notification.message,
        imageUrl: notification.imageUrl || "",
        data: {
          type: "global_notification",
          notificationId: notification._id.toString(),
        },
      });
    }

    console.log(`✅ Push sent to ${users.length} users`);
  } catch (error) {
    // Never fail the API if Firebase fails
    console.error("Firebase Push Error:", error.message);
  }

  return notification;
};
// Get All Notifications

const getAllNotifications =
  async () => {
    return await Notification.find().sort({
      createdAt: -1,
    });
  };

// Get Notification By Id

const getNotificationById =
  async (
    notificationId
  ) => {
    return await Notification.findById(
      notificationId
    );
  };

// Delete Notification

const deleteNotification =
  async (
    notificationId
  ) => {
    const notification =
      await Notification.findById(
        notificationId
      );

    if (!notification) {
      throw new Error(
        "Notification not found"
      );
    }

    if (
      notification.publicId
    ) {
      await cloudinary.uploader.destroy(
        notification.publicId
      );
    }

    await Notification.findByIdAndDelete(
      notificationId
    );

    return notification;
  };

export default {
  createNotification,
  getAllNotifications,
  getNotificationById,
  deleteNotification,

};