import admin from "../config/firebaseAdmin.js";
import User from "../models/user.model.js";

const sendPushNotification = async ({
  token,
  title,
  body,
  imageUrl = "",
  data = {},
}) => {
  if (!token) return;

  try {
    await admin.messaging().send({
      token,

      notification: {
        title,
        body,
      },

      android: {
        priority: "high",
        notification: {
          channelId: "high_importance_channel",
          imageUrl,
        },
      },

      apns: {
        payload: {
          aps: {
            sound: "default",
          },
        },
        fcmOptions: {
          imageUrl,
        },
      },

      data: Object.keys(data).reduce((acc, key) => {
        acc[key] = String(data[key]);
        return acc;
      }, {}),
    });

    console.log("✅ Push notification sent");
  } catch (error) {
    console.error("Firebase Error:", error.code);

    // Remove invalid token from database
    if (
      error.code === "messaging/registration-token-not-registered" ||
      error.code === "messaging/invalid-registration-token"
    ) {
      console.log("Removing invalid FCM Token");

      await User.findOneAndUpdate(
        { fcmToken: token },
        {
          fcmToken: null,
        }
      );
    }
  }
};

export default {
  sendPushNotification,
};