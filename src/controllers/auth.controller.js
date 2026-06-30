import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import { generateOTP } from "../utils/otpGenerator.js";
import twilioClient from "../config/twilio.js";

// Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, mobileNo, dob, address } = req.body;

    // Validation
    if (!name || !email || !password || !mobileNo || !dob || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing email
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Check existing mobile number
    const existingMobile = await User.findOne({
      mobileNo,
    });

    if (existingMobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      mobileNo,
      dob,
      address,
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Signup Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        mobileNo: user.mobileNo,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    ); // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Forgot Password - Email OTP
export const forgotPasswordEmail = async (req, res) => {
  try {
    console.log("========== FORGOT PASSWORD EMAIL ==========");

    const { email } = req.body;
    console.log("Request Email:", email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    console.log("User:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    const otp = generateOTP();
    console.log("Generated OTP:", otp);

    const hashedOtp = await bcrypt.hash(otp, 10);

    user.emailOtp = hashedOtp;
    user.emailOtpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    user.emailOtpVerified = false;
    user.passwordResetMethod = "email";

    console.log("Saving user...");
    await user.save();
    console.log("User saved successfully.");

    console.log("Calling sendEmail...");
    await sendEmail(
      user.email,
      "Password Reset OTP",
      `
      <h2>Your OTP is ${otp}</h2>
      `,
    );

    console.log("sendEmail completed.");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.error("Forgot Password Email Error");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Email OTP
export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.emailOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new OTP.",
      });
    }

    if (new Date() > user.emailOtpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    const isOtpValid = await bcrypt.compare(otp, user.emailOtp);

    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.emailOtpVerified = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { mobileNo, newPassword, confirmPassword } = req.body;

    // Validation
    if (!mobileNo || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Mobile number, new password and confirm password are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Find user by mobile number
    const user = await User.findOne({ mobileNo });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check OTP verification
    if (
      !user.emailOtpVerified ||
      !["email", "mobile"].includes(user.passwordResetMethod)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;

    // Clear OTP data
    user.emailOtp = null;
    user.emailOtpExpiry = null;
    user.emailOtpVerified = false;
    user.passwordResetMethod = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Forgot Password - Mobile OTP
export const forgotPasswordMobile = async (req, res) => {
  try {
    const { mobileNo } = req.body;

    if (!mobileNo) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    const user = await User.findOne({ mobileNo });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Mobile number not registered",
      });
    }

    await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: `+91${mobileNo}`,
        channel: "sms",
      });

    user.passwordResetMethod = "mobile";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your mobile number.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Mobile OTP
export const verifyMobileOtp = async (req, res) => {
  try {
    const { mobileNo, otp } = req.body;

    if (!mobileNo || !otp) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and OTP are required",
      });
    }

    const user = await User.findOne({ mobileNo });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Mobile number not registered",
      });
    }

    const verificationCheck = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: `+91${mobileNo}`,
        code: otp,
      });

    if (verificationCheck.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Allow password reset
    user.emailOtpVerified = true;
    user.passwordResetMethod = "mobile";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Mobile OTP verified successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
