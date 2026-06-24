import Notification from "../models/notification.model.js";
import CustomNotification from "../models/customNotification.model.js";
import UserNotificationRead from "../models/userNotificationRead.model.js";

const getUserNotifications = async (userId) => {
  const globalNotifications =
    await Notification.find();

  const customNotifications =
    await CustomNotification.find({
      userId,
    });

  const notifications = [
    ...globalNotifications.map((item) => ({
      ...item.toObject(),
      type: "global",
    })),
    ...customNotifications.map((item) => ({
      ...item.toObject(),
      type: "custom",
    })),
  ];

  notifications.sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

  return notifications;
};

const markAsRead = async ({
  userId,
  notificationId,
  notificationType,
}) => {
  const existing =
    await UserNotificationRead.findOne({
      userId,
      notificationId,
      notificationType,
    });

  if (existing) {
    return existing;
  }

  return await UserNotificationRead.create({
    userId,
    notificationId,
    notificationType,
  });
};

const getUnreadCount = async (
  userId
) => {
  const globalCount =
    await Notification.countDocuments();

  const customCount =
    await CustomNotification.countDocuments({
      userId,
    });

  const totalNotifications =
    globalCount + customCount;

  const readCount =
    await UserNotificationRead.countDocuments({
      userId,
    });

  return totalNotifications - readCount;
};

export default {
  getUserNotifications,
  markAsRead,
  getUnreadCount,
};