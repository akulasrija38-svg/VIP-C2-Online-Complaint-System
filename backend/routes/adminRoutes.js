const express = require("express");
const router = express.Router();

const Complaint = require("../models/Complaint");

const protect =
require("../middleware/authMiddleware");

const adminOnly =
require("../middleware/adminMiddleware");

router.get(
  "/complaints",
  protect,
  adminOnly,
  async (req, res) => {

    try {

      const complaints =
      await Complaint.find()
      .populate("user", "name email");

      res.json(complaints);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;