import dns from "dns";
import nodemailer from "nodemailer";

dns.setDefaultResultOrder("ipv4first");

console.log("========== MAIL CONFIG ==========");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌"
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

(async () => {
  try {
    await transporter.verify();
    console.log("✅ Mailer Ready");
  } catch (err) {
    console.error("❌ Mailer Verify Error");
    console.error(err);
  }
})();

export default transporter;