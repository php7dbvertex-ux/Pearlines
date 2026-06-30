import transporter from "../config/mailer.js";

const sendEmail = async (to, subject, html) => {
  try {
    console.log("====================================");
    console.log("Sending Email...");
    console.log("To:", to);
    console.log("Subject:", subject);

    const info = await transporter.sendMail({
      from: `"Dental Clinic" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email Sent Successfully");
    console.log(info.response);

    return info;
  } catch (error) {
    console.error("❌ Send Email Error");
    console.error(error);

    throw error;
  }
};

export default sendEmail;