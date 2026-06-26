import uploadService from "../services/upload.service.js";

const uploadImage = async (req, res) => {
  try {
    const result = await uploadService.uploadImage(req.file.path, "pearlline");

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export default {
  uploadImage,
};
