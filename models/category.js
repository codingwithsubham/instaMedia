const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subCategory: [
    {
      type: String,
      require: true,
    },
  ],
});

module.exports = Category = mongoose.model("category", CategorySchema);
