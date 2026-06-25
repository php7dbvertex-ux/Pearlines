import PaymentConfig from "../models/paymentConfig.model.js";

// ADMIN SET PAYMENT

export const setPaymentConfig =
  async (req, res) => {
    try {
      const {
        amount,
        title,
        description,
      } = req.body;

      let config =
        await PaymentConfig.findOne();

      if (!config) {
        config =
          await PaymentConfig.create({
            amount,
            title,
            description,
          });
      } else {
        config.amount = amount;
        config.title = title;
        config.description =
          description;

        await config.save();
      }

      return res.status(200).json({
        success: true,
        message:
          "Payment configuration updated successfully",
        config,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// USER GET PAYMENT INFO

export const getPaymentConfig =
  async (req, res) => {
    try {
      const config =
        await PaymentConfig.findOne();

      if (!config) {
        return res.status(404).json({
          success: false,
          message:
            "Payment configuration not found",
        });
      }

      return res.status(200).json({
        success: true,
        config,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };