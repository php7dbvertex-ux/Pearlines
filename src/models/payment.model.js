import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    orderId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },

    description: {
      type: String,
    },

    paymentId: {
      type: String,
      default: "",
    },
    paymentRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentRequest",
    },

    signature: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    method: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Payment", paymentSchema);
