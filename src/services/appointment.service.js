import Appointment from "../models/appointment.model.js";

const createAppointment = async (appointmentData) => {
  const existingAppointment =
    await Appointment.findOne({
      patientId: appointmentData.patientId,
      patientName: appointmentData.patientName,
    });

  const isRevisit = !!existingAppointment;

  return await Appointment.create({
    ...appointmentData,
    isRevisit,
  });
};
const getAppointmentById = async (appointmentId) => {
  return await Appointment.findById(appointmentId);
};



const getAllAppointments = async () => {
  return await Appointment.find({
    isRevisit: false,
  }).sort({
    createdAt: -1,
  });
};



const updateAppointment = async (appointmentId, updateData) => {
  return await Appointment.findByIdAndUpdate(appointmentId, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteAppointment = async (appointmentId) => {
  return await Appointment.findByIdAndDelete(appointmentId);
};

const createRevisitAppointment = async (revisitData) => {
  return await Appointment.create({
    ...revisitData,

    isRevisit: true,
  });
};

const getMyAppointments = async (userId) => {
  return await Appointment.find({
    patientId: userId,
  }).sort({
    createdAt: -1,
  });
};

const getAllRevisitAppointments = async () => {
  return await Appointment.find({
    isRevisit: true,
  }).sort({
    createdAt: -1,
  });
};

export const getRevisitAppointments = async () => {
  const response = await api.get("/appointments/revisit");

  return response.data;
};

const getTodayAppointments = async () => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);

  tomorrow.setDate(tomorrow.getDate() + 1);

  return await Appointment.find({
    appointmentDate: {
      $gte: today,
      $lt: tomorrow,
    },

    isRevisit: false,
  }).sort({
    appointmentDate: 1,
  });
};


const getMyAppointmentById = async (
  appointmentId,
  userId
) => {
  return await Appointment.findOne({
    _id: appointmentId,
    patientId: userId,
  });
};


const cancelMyAppointment = async (
  appointmentId,
  userId
) => {
  return await Appointment.findOneAndDelete({
    _id: appointmentId,
    patientId: userId,
    status: "Pending",
  });
};



const updateMyAppointment = async (
  appointmentId,
  userId,
  updateData
) => {
  const appointment =
    await Appointment.findOne({
      _id: appointmentId,
      patientId: userId,
    });

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (appointment.status !== "Pending") {
    throw new Error(
      "Only pending appointments can be updated"
    );
  }

  return await Appointment.findByIdAndUpdate(
    appointmentId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};



export default {
  createAppointment,
  getAppointmentById,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  createRevisitAppointment,
  getAllRevisitAppointments,
  getRevisitAppointments,
  getTodayAppointments,
  getMyAppointments,
  getMyAppointmentById,
  cancelMyAppointment,
  updateMyAppointment,

};
