import jwt from "jsonwebtoken";

const adminAuth = (
  req,
  res,
  next
) => {
    console.log("========= ADMIN AUTH =========");
  console.log(req.method);
  console.log(req.originalUrl);

  console.log("Authorization:");
  console.log(req.headers.authorization);

  console.log("==============================");
  try {
    const token =
      req.headers.authorization?.split(
        " "
      )[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (
      decoded.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Admin access denied",
      });
    }

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default adminAuth;