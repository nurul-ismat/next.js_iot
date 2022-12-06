const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: String,
  username: {
    type: String,
    required: [true, "Please add a value"],
    unique: true,
  },
});
if (mongoose.models != undefined)
  module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
else mongoose.model("User", UserSchema);
