const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    require: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    require: true,
  },
  subCategory: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  isSeries: {
    type: Boolean,
    require: true,
  },
  seriseData: {
    episodes: [
      {
        url: {
          type: String,
        },
      },
    ],
  },
  isTrailingSeson: {
    type: Boolean,
    require: true,
  },
  trailingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "content",
  },
  uloadDate: {
    type: String,
    require: true,
  },
});

module.exports = Content = mongoose.model("content", ContentSchema);
