import mongoose from "mongoose";

const paymentConfigSchema =
  new mongoose.Schema(
    {
      amount: {
        type: Number,
        required: true,
        default: 0,
      },

      title: {
        type: String,
        default: "Service Charge",
      },

      description: {
        type: String,
        default: "",
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "PaymentConfig",
  paymentConfigSchema
);