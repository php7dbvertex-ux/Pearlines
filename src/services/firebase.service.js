import { messaging } from "../config/firebaseAdmin.js";
import User from "../models/user.model.js";

const sendPushNotification = async ({
  token,
  title,
  body,
  imageUrl = "",
  data = {},
}) => {
  // =========================
  // Validate Token
  // =========================

  if (!token) {
    console.log("❌ No FCM Token Found");
    return;
  }

  console.log("\n======================================");
  console.log("🚀 sendPushNotification() CALLED");
  console.log("======================================");
  console.log("Token:");
  console.log(token);

  console.log("Title:");
  console.log(title);

  console.log("Body:");
  console.log(body);

  // =========================
  // Create FCM Message
  // =========================
const message = {
  token,

  notification: {
    title,
    body,
  },

  android: {
    priority: "high",
    notification: {
      channelId: "high_importance_channel",
      ...(imageUrl ? { imageUrl } : {}),
    },
  },

  apns: {
    payload: {
      aps: {
        sound: "default",
      },
    },
    ...(imageUrl
      ? {
          fcmOptions: {
            imageUrl,
          },
        }
      : {}),
  },

  data: Object.fromEntries(
    Object.entries(data).map(([k, v]) => [
      k,
      String(v),
    ])
  ),
};
  console.log("\n📦 FCM Payload:");
  console.log(JSON.stringify(message, null, 2));

  // =========================
  // Send Notification
  // =========================

  try {
    console.log("\n📤 Sending notification to Firebase...");

    const response = await messaging.send(message);

    console.log("\n✅ Firebase accepted the notification");
    console.log("Response:");
    console.log(response);

    console.log("======================================\n");

    return response;
  } catch (error) {
    console.log("\n❌ Firebase Error");
    console.log("--------------------------------------");
    console.log("Code:");
    console.log(error.code);

    console.log("\nMessage:");
    console.log(error.message);

    console.log("\nComplete Error:");
    console.log(error);

    console.log("======================================\n");

    // Remove invalid token from DB
    if (
      error.code === "messaging/registration-token-not-registered" ||
      error.code === "messaging/invalid-registration-token"
    ) {
      console.log("🗑 Removing invalid FCM token from database...");

      await User.updateOne(
        { fcmToken: token },
        {
          $set: {
            fcmToken: null,
          },
        }
      );

      console.log("✅ Invalid token removed");
    }

    return null;
  }
};

export default {
  sendPushNotification,
};