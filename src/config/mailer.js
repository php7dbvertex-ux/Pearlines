import nodemailer from "nodemailer";

console.log("========== BREVO MAIL CONFIG ==========");

console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log(
  "SMTP_PASS:",
  process.env.SMTP_PASS ? "Loaded ✅" : "Missing ❌"
);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

(async () => {
  try {
    await transporter.verify();
    console.log("✅ Brevo Mailer Ready");
  } catch (err) {
    console.error("❌ Brevo Mailer Error");
    console.error(err);
  }
})();

export default transporter;