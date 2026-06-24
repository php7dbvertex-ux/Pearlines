import mongoose from "mongoose";

const notificationReadSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      notificationId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Notification",
        required: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export default mongoose.model(
  "NotificationRead",
  notificationReadSchema
);