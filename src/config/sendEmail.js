import transporter from "../config/mailer.js";

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Dental Clinic" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email Sent");
    console.log(info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Email Send Error");
    console.error(error);
    throw error;
  }
};

export default sendEmail;