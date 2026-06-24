import mongoose from "mongoose";

const messageSchema =
  new mongoose.Schema(
    {
      chatId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
      },

      senderType: {
        type: String,
        enum: [
          "user",
          "admin",
        ],
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      // For admin panel badge
      seenByAdmin: {
        type: Boolean,
        default: false,
      },

      // For user app badge
      seenByUser: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export default mongoose.model(
  "Message",
  messageSchema
);