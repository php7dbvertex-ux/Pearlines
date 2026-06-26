import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("PrivacyPolicy", privacyPolicySchema);
