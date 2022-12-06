const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  _id: String,
  user: { type: String, ref: "User" },
  host: {
    type: String,
    required: [true, "Please add a value"],
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  clientId: {
    type: String,
    required: [true, "Please add a value"],
  },
  reconnectPeriod: {
    type: Number,
    required: [true, "Please add a value"],
  },
  connectTimeout: {
    type: Number,
    required: [true, "Please add a value"],
  },
  port: {
    type: Number,
    required: [true, "Please add a value"],
  },
  path: {
    type: String,
  },
  status: String,
  subscription: [
    {
      type: "String",
    },
  ],
});
if (mongoose.models != undefined)
  module.exports =
    mongoose.models.Client || mongoose.model("Client", ClientSchema);
else module.exports = mongoose.model("Client", ClientSchema);
