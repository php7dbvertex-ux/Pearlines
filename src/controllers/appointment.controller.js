import appointmentService from "../services/appointment.service.js";

const createAppointment = async (req, res) => {
  try {
    const appointmentData = {
      ...req.body,

      // logged-in user
      patientId: req.user.id,
    };

    const appointment =
      await appointmentService.createAppointment(
        appointmentData
      );

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllAppointments = async (
  req,
  res
) => {
  try {
    const appointments =
      await appointmentService.getAllAppointments();

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAppointmentById = async (
  req,
  res
) => {
  try {
    const appointment =
      await appointmentService.getAppointmentById(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAppointment = async (
  req,
  res
) => {
  try {
    const appointment =
      await appointmentService.updateAppointment(
        req.params.id,
        req.body
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAppointment = async (
  req,
  res
) => {
  try {
    const appointment =
      await appointmentService.deleteAppointment(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createRevisitAppointment =
  async (req, res) => {
    try {
      const revisit =
        await appointmentService.createRevisitAppointment(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Revisit appointment created successfully",
        data: revisit,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

const getAllRevisitAppointments =
  async (req, res) => {
    try {
      const revisits =
        await appointmentService.getAllRevisitAppointments();

      res.status(200).json({
        success: true,
        count: revisits.length,
        data: revisits,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  const getTodayAppointments =
  async (req, res) => {
    try {
      const appointments =
        await appointmentService.getTodayAppointments();

      res.status(200).json({
        success: true,
        count:
          appointments.length,
        data: appointments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };



  const getMyAppointments = async (req, res) => {
  try {
    const appointments =
      await appointmentService.getMyAppointments(
        req.user.id
      );

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getMyAppointmentById = async (
  req,
  res
) => {
  try {
    const appointment =
      await appointmentService.getMyAppointmentById(
        req.params.id,
        req.user.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelMyAppointment = async (
  req,
  res
) => {
  try {
    const appointment =
      await appointmentService.cancelMyAppointment(
        req.params.id,
        req.user.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found or cannot be cancelled",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Appointment cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const updateMyAppointment = async (
  req,
  res
) => {
  try {
    const appointment =
      await appointmentService.updateMyAppointment(
        req.params.id,
        req.user.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export default {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  createRevisitAppointment,
  getAllRevisitAppointments,
  getTodayAppointments,
  getMyAppointments,
  getMyAppointmentById,
  cancelMyAppointment,
  updateMyAppointment,
};