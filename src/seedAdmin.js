import bcrypt from "bcryptjs";

import mongoose from "mongoose";

import dotenv from "dotenv";

import Admin from "./models/admin.model.js";

dotenv.config();

await mongoose.connect(
  process.env.MONGODB_URI
);

const existingAdmin =
  await Admin.findOne({
    email:
      process.env.ADMIN_EMAIL,
  });

if (existingAdmin) {
  console.log(
    "Admin already exists"
  );

  process.exit();
}

const hashedPassword =
  await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    10
  );

await Admin.create({
  name: "Super Admin",

  email:
    process.env.ADMIN_EMAIL,

  mobileNo:
    "9999999999",

  password:
    hashedPassword,
});

console.log(
  "Admin created successfully"
);

process.exit();