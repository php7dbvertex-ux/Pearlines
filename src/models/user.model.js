import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    emailOtp: {
      type: String,
      default: null,
    },

    emailOtpExpiry: {
      type: Date,
      default: null,
    },

    emailOtpVerified: {
      type: Boolean,
      default: false,
    },

    passwordResetMethod: {
      type: String,
      enum: ["email", "mobile", null],
      default: null,
    },
    mobileNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fcmToken: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },

    profileImagePublicId: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("User", userSchema);
