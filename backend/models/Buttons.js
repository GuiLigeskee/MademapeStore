const mongoose = require("mongoose");
const { Schema } = mongoose;

const buttonSchema = new mongoose.Schema(
  {
    title: String,
    icon: String,
    url: String,
    clicks: Array,
    userId: mongoose.ObjectId,
    userName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Button", buttonSchema);
