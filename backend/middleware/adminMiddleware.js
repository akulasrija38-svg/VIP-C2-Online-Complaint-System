const adminOnly = (req, res, next) => {
    console.log("Role:", req.user.role);
    console.log("Role:", req.user.role);
console.log("Email:", req.user.email);

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin Access Only"
    });

  }

  next();

};

module.exports = adminOnly;
