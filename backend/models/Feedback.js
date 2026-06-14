const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
{
  complaint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Complaint"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  rating: {
    type: Number,
    required: true
  },

  comment: {
    type: String
  }
},
{
  timestamps: true
}
);

module.exports =
mongoose.model(
  "Feedback",
  feedbackSchema
);