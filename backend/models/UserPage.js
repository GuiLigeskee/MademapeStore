const mongoose = require("mongoose");
const { Schema } = mongoose;

const pageSchema = new Schema(
  {
    username: String,
    nameColor: String,
    backgroundImage: String,
    profileImage: String,
    userId: mongoose.ObjectId,
    buttonId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Page", pageSchema);
