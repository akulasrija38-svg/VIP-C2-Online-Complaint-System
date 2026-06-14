const Complaint = require("../models/Complaint");

// Create Complaint
const createComplaint = async (req, res) => {
  try {

    const complaint = await Complaint.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      user: req.user._id
    });

    res.status(201).json(complaint);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Get Complaints
const getComplaints = async (req, res) => {

  try {

    const complaints =
      await Complaint.find();

    res.status(200).json(
      complaints
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Update Complaint Status
const updateComplaint = async (req, res) => {

  try {

    const complaint =
      await Complaint.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status
        },
        {
          new: true
        }
      );

    res.json(complaint);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createComplaint,
  getComplaints,
  updateComplaint
};