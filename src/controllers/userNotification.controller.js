import Notification from "../models/notification.model.js";
import CustomNotification from "../models/customNotification.model.js";
import NotificationRead from "../models/notificationRead.model.js";

import userNotificationService from "../services/userNotification.service.js";

const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const globalNotifications =
      await Notification.find();

    const customNotifications =
      await CustomNotification.find({
        userId,
      });

    const notifications = [
      ...globalNotifications.map((n) => ({
        ...n.toObject(),
        type: "global",
      })),

      ...customNotifications.map((n) => ({
        ...n.toObject(),
        type: "custom",
      })),
    ];

    notifications.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getUnreadCount = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;

    const unreadCustom =
      await CustomNotification.countDocuments({
        userId,
        isRead: false,
      });

    const totalGlobal =
      await Notification.countDocuments();

    const readGlobal =
      await NotificationRead.countDocuments({
        userId,
      });

    const unreadGlobal =
      totalGlobal - readGlobal;

    res.status(200).json({
      success: true,
      unreadCount:
        unreadCustom + unreadGlobal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const userId = req.user.id;

    // Mark all custom notifications as read
    await CustomNotification.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );

    // Mark all global notifications as read
    const globalNotifications =
      await Notification.find({}, "_id");

    const readRecords =
      globalNotifications.map((n) => ({
        userId,
        notificationId: n._id,
      }));

    if (readRecords.length > 0) {
      await NotificationRead.insertMany(
        readRecords,
        { ordered: false }
      ).catch(() => {});
    }

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


  
const markAsRead = async (
  req,
  res
) => {
  try {
    const {
      notificationId,
      notificationType,
    } = req.body;

    await userNotificationService.markAsRead(
      {
        userId: req.user.id,
        notificationId,
        notificationType,
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Notification marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};





export default {

    getUnreadCount,
    markNotificationRead,
      getUserNotifications,
  markAsRead,
};