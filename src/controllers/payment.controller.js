import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/payment.model.js";
import PaymentRequest from "../models/paymentRequest.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER
export const createOrder = async (
  req,
  res
) => {
  try {
    const { paymentRequestId } =
      req.body;

    if (!paymentRequestId) {
      return res.status(400).json({
        success: false,
        message:
          "paymentRequestId is required",
      });
    }

    const request =
      await PaymentRequest.findById(
        paymentRequestId
      );

    if (!request) {
      return res.status(404).json({
        success: false,
        message:
          "Payment request not found",
      });
    }

    // Security Check
    if (
      request.userId.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Unauthorized payment request",
      });
    }

    // Already Paid Check
    if (request.status === "paid") {
      return res.status(400).json({
        success: false,
        message:
          "Payment already completed",
      });
    }

    const options = {
      amount: request.amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order =
      await razorpay.orders.create(
        options
      );

    await Payment.create({
      userId: req.user.id,
      paymentRequestId:
        request._id,
      amount: request.amount,
      title: request.title,
      description:
        request.description,
      orderId: order.id,
      status: "pending",
    });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// VERIFY PAYMENT
export const verifyPayment =
  async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = req.body;

      const body =
        razorpay_order_id +
        "|" +
        razorpay_payment_id;

      const expectedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(body.toString())
          .digest("hex");

      if (
        expectedSignature !==
        razorpay_signature
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Payment verification failed",
        });
      }

      const payment =
        await Payment.findOneAndUpdate(
          {
            orderId:
              razorpay_order_id,
          },
          {
            paymentId:
              razorpay_payment_id,
            signature:
              razorpay_signature,
            status: "success",
          },
          {
            new: true,
          }
        );

      if (!payment) {
        return res.status(404).json({
          success: false,
          message:
            "Payment record not found",
        });
      }

      // Mark Request Paid
      if (
        payment.paymentRequestId
      ) {
        await PaymentRequest.findByIdAndUpdate(
          payment.paymentRequestId,
          {
            status: "paid",
          }
        );
      }

      return res.status(200).json({
        success: true,
        message:
          "Payment verified successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// ADMIN PAYMENT LIST
export const getAllPayments =
  async (req, res) => {
    try {
      const payments =
        await Payment.find()
          .populate(
            "userId",
            "name email mobileNo"
          )
          .populate(
            "paymentRequestId"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        payments,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// USER PAYMENT HISTORY
export const getMyPayments =
  async (req, res) => {
    try {
      const payments =
        await Payment.find({
          userId: req.user.id,
        })
          .populate(
            "paymentRequestId"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        payments,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };