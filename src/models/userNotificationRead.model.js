import mongoose from "mongoose";

const userNotificationReadSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      notificationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

      notificationType: {
        type: String,
        enum: ["global", "custom"],
        required: true,
      },

      readAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export default mongoose.model(
  "UserNotificationRead",
  userNotificationReadSchema
);