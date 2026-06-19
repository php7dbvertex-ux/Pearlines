import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    
    },

    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
     
      trim: true,
      lowercase: true,
    },

    mobileNo: {
      type: String,
     
      trim: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
    },

    problem: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rescheduled"],
      default: "Pending",
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    isRevisit: {
      type: Boolean,
      default: false,
    },

    parentAppointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },

    nextVisit: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("Appointment", appointmentSchema);
