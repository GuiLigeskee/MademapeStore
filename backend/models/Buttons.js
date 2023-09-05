const mongoose = require("mongoose");
const {Schema} = mongoose;

const buttonSchema = new mongoose.Schema({
  style: String,
  icon: String,
  colorButton: String,
  title: String,
  colorTitle: String,
  url: String,
  clicks: { type: Number, default: 0 },
  userId: mongoose.ObjectId,
  userName: String,
}, {
    timestamps: true,
});

Buttons = mongoose.model("Buttons", photoSchema);

module.exports = mongoose.model("Button", buttonSchema);