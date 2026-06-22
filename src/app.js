import express from "express";
import userRoutes from "./routes/user.routes.js";
import appointmentRoutes from "./routes/appointment.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";

import doctorRoutes from "./routes/doctor.route.js";

import doctorScheduleRoutes from "./routes/doctorSchedule.route.js";

import aboutUsRoutes from "./routes/aboutUs.route.js";

import privacyPolicyRoutes from "./routes/privacyPolicy.route.js";

import termsConditionRoutes from "./routes/termsCondition.route.js";

import faqRoutes from "./routes/faq.route.js";

import uploadRoutes from "./routes/upload.route.js";

import bannerRoutes from "./routes/banner.route.js";

import tipRoutes from "./routes/tip.route.js";

import videoRoutes from "./routes/video.route.js";

import serviceRoutes from "./routes/service.route.js";

import galleryRoutes from "./routes/gallery.route.js";

import notificationRoutes from "./routes/notification.route.js";

import customNotificationRoutes from "./routes/customNotification.route.js";

import paymentRoutes from "./routes/payment.route.js";

import chatRoutes from "./routes/chat.route.js";

import messageRoutes from "./routes/message.route.js";

import authRoutes from "./routes/auth.routes.js";


import adminRoutes from "./routes/adminRoutes.js";


import cors from "cors";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pearlines-frontend-admin-tdhr.onrender.com",
    ],
    
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/upload", uploadRoutes);

app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/doctor-schedules", doctorScheduleRoutes);
app.use("/api/terms-conditions", termsConditionRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/about-us", aboutUsRoutes);
app.use("/api/privacy-policy", privacyPolicyRoutes);
app.use("/api/custom-notifications", customNotificationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);


app.use("/api/messages", messageRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Dental Clinic API Running",
  });
});

export default app;
