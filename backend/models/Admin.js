// AdminModel.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
