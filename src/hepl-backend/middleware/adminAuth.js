const adminAuth = (req, res, next) => {
  const { role } = req.body;

  if (role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  next();
};

export default adminAuth;
