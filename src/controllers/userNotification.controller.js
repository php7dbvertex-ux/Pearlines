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

const markNotificationRead =
  async (req, res) => {
    try {
      const userId = req.user.id;

      const {
        notificationId,
        type,
      } = req.body;

      if (type === "custom") {
        await CustomNotification.findOneAndUpdate(
          {
            _id: notificationId,
            userId,
          },
          {
            isRead: true,
          }
        );
      }

      if (type === "global") {
        const exists =
          await NotificationRead.findOne({
            userId,
            notificationId,
          });

        if (!exists) {
          await NotificationRead.create({
            userId,
            notificationId,
          });
        }
      }

      res.status(200).json({
        success: true,
        message:
          "Notification marked as read",
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
  getUserNotifications,
    getUnreadCount,
    markNotificationRead,
      getUserNotifications,
  markAsRead,
};