import { messaging } from "../config/firebaseAdmin.js";
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
    await messaging.send({
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

      data: Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          String(value),
        ])
      ),
    });

    console.log("✅ Push notification sent");
  } catch (error) {
    console.error("Firebase Error:", error.code);

    if (
      error.code === "messaging/registration-token-not-registered" ||
      error.code === "messaging/invalid-registration-token"
    ) {
      console.log("Removing invalid FCM Token...");

      await User.updateOne(
        { fcmToken: token },
        {
          $set: {
            fcmToken: null,
          },
        }
      );
    }
  }
};

export default {
  sendPushNotification,
};