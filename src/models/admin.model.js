import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
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
      lowercase: true,
    },

    mobileNo: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    profileImagePublicId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model(
  "Admin",
  adminSchema
);