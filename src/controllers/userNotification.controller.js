import Notification from "../models/notification.model.js";
import CustomNotification from "../models/customNotification.model.js";
import NotificationRead from "../models/notificationRead.model.js";

import userNotificationService from "../services/userNotification.service.js";

const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const globalNotifications = await Notification.find();

    const customNotifications = await CustomNotification.find({
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

    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const unreadCustom =
      await CustomNotification.countDocuments({
        userId,
        isRead: false,
      });

    const notifications =
      await Notification.find({}, "_id");

    const notificationIds =
      notifications.map((n) => n._id);

    const totalGlobal =
      notificationIds.length;

    const readGlobal =
      await NotificationRead.countDocuments({
        userId,
        notificationId: {
          $in: notificationIds,
        },
      });

    const unreadGlobal =
      totalGlobal - readGlobal;

    res.status(200).json({
      success: true,
      unreadCount:
        unreadCustom + unreadGlobal,
      debug: {
        unreadCustom,
        totalGlobal,
        readGlobal,
        unreadGlobal,
      },
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

    // Mark custom notifications read
    await CustomNotification.updateMany(
      { userId },
      {
        $set: {
          isRead: true,
        },
      },
    );

    // Get all global notifications
    const notifications = await Notification.find({}, "_id");

    // Insert only if not already read
    for (const notification of notifications) {
      await NotificationRead.updateOne(
        {
          userId,
          notificationId: notification._id,
        },
        {
          $setOnInsert: {
            userId,
            notificationId: notification._id,
          },
        },
        {
          upsert: true,
        },
      );
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

const markAsRead = async (req, res) => {
  try {
    const { notificationId, notificationType } = req.body;

    await userNotificationService.markAsRead({
      userId: req.user.id,
      notificationId,
      notificationType,
    });

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const cleanNotificationReads = async (
  req,
  res
) => {
  try {
    const notifications =
      await Notification.find({}, "_id");

    const ids = notifications.map(
      (n) => n._id
    );

    const result =
      await NotificationRead.deleteMany({
        notificationId: {
          $nin: ids,
        },
      });

    res.json({
      success: true,
      deleted: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getUnreadCount,
  markNotificationRead,
  getUserNotifications,
  cleanNotificationReads,
  markAsRead,
};
