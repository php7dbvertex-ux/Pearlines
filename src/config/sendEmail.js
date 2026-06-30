import axios from "axios";

const sendEmail = async (to, subject, html) => {
  try {
    console.log("========== SENDING EMAIL ==========");
    console.log("To:", to);

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.EMAIL_FROM_NAME,
          email: process.env.EMAIL_FROM,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email Sent");
    console.log(response.data);

    return response.data;
} catch (error) {
  console.log("========== BREVO ERROR ==========");

  console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);
  console.log("Message:", error.message);

  throw error;
}
};

export default sendEmail;