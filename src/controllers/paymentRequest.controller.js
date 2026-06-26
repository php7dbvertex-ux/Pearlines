import PaymentRequest from "../models/paymentRequest.model.js";

// ADMIN CREATE REQUEST

export const createPaymentRequest =
  async (req, res) => {
    try {
      const {
        userId,
        amount,
        title,
        description,
      } = req.body;

      const request =
        await PaymentRequest.create({
          userId,
          amount,
          title,
          description,
        });

      res.status(201).json({
        success: true,
        message:
          "Payment request created",
        data: request,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// USER GET HIS REQUESTS

export const getMyPaymentRequests =
  async (req, res) => {
    try {
      const requests =
        await PaymentRequest.find({
          userId: req.user.id,
          status: "pending",
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        count: requests.length,
        data: requests,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// ADMIN ALL REQUESTS

export const getAllPaymentRequests =
  async (req, res) => {
    try {
      const requests =
        await PaymentRequest.find()
          .populate(
            "userId",
            "name email mobileNo"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        count: requests.length,
        data: requests,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };