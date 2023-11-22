const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    userUrl: String,
    bio: String,
    work: String,
    email: String,
    password: String,
    tell: String,
    whatsapp: String,
    address: String,
    profileImage: String,
    colorTheme: String,
    nameColor: String,
    typeIcons: Boolean,
    darkTheme: Boolean,
    contactButtons: Boolean,
    pix: String,
  },
  {
    timestamps: true,
  }
);

User = mongoose.model("User", userSchema);

module.exports = User;
