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

    mobileNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
profileImage: {
  type: String,
  default: "",
},

profileImagePublicId: {
  type: String,
  default: "",
}, dob: {
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
  }
);

export default mongoose.model("User", userSchema);