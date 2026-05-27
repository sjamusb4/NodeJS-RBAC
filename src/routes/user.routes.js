const express = require("express");
const authorizeRole = require("../middlewares/role.middleware");
const router = express.Router();

// Only Admin Can Access
router.get("/admin", authorizeRole("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome Admin",
    userRole: req.user.role,
  });
});

// Both Admin and Manager Can Access
router.get("/manager", authorizeRole("admin", "manager"), (req, res) => {
  res.status(200).json({
    message: "Welcome Manager",
    userRole: req.user.role,
  });
});

// All Can Access
router.get("/user", authorizeRole("admin", "manager", "user"), (req, res) => {
  res.status(200).json({
    message: "Welcome User",
    userRole: req.user.role,
  });
});

module.exports = router;
