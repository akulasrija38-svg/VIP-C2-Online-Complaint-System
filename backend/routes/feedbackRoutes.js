const express =
require("express");

const router =
express.Router();

const Feedback =
require("../models/Feedback");

const protect =
require("../middleware/authMiddleware");

const {
  createFeedback
} =
require("../controllers/feedbackController");

// Submit Feedback
router.post(
  "/",
  protect,
  createFeedback
);

// Get All Feedbacks
router.get(
  "/",
  async (req, res) => {

    try {

      const feedbacks =
      await Feedback.find();

      res.json(feedbacks);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;