const Feedback =
require("../models/Feedback");

const createFeedback =
async (req, res) => {


  try {

    console.log("BODY:", req.body);
console.log("USER:", req.user);

    const feedback =
    await Feedback.create({

      complaint:
      req.body.complaint,

      user:
      req.user.id,

      rating:
      req.body.rating,

      comment:
      req.body.comment

    });

    res.status(201).json(
      feedback
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createFeedback
};