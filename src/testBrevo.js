import "dotenv/config.js";
import transporter from "./config/mailer.js";

try {
  const info = await transporter.sendMail({
    from: `"Dental Clinic" <${process.env.EMAIL_FROM}>`,
    to: "your_email@gmail.com",
    subject: "Brevo Test",
    text: "Hello from Brevo!",
  });

  console.log("Email sent:", info.messageId);
} catch (err) {
  console.error(err);
}