const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserButtonsSchema = new Schema(
    {
        style: String,
        title: String,
        url: String,
        acessos: Array,
        userId: mongoose.ObjectId,
        userName: String,
    },
    {
        timestamps: true,
    }
);

UserButtons = mongoose.model("UserButtons", photoSchema);

module.exports = UserButtons