import notificationService from "../services/notification.service.js";
import User from "../models/user.model.js";
import firebaseService from "../services/firebase.service.js";

// Create Notification
const createNotification = async (req, res) => {
  console.log("=================================");
  console.log("✅ Notification Controller Called");
  console.log(req.body);
  console.log("=================================");

  try {
    const notification =
      await notificationService.createNotification(req.body);

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Notifications

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getAllNotifications();

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

// Get Notification By Id

const getNotificationById = async (req, res) => {
  try {
    const notification = await notificationService.getNotificationById(
      req.params.id,
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Notification

const deleteNotification = async (req, res) => {
  try {
    await notificationService.deleteNotification(req.params.id);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createNotification,
  getAllNotifications,
  getNotificationById,
  deleteNotification,
};
