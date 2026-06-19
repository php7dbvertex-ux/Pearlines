const adminAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({
      success: false,
      message: "Admin access denied",
    });
  }

  next();
};

export default adminAuth;