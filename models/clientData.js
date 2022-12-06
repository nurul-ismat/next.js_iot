const mongoose = require("mongoose");

const ClientDataSchema = new mongoose.Schema({
  _id: String,
  clientId: { type: String, ref: "Client" },
  topic: { type: String, required: true },
  value: mongoose.Schema.Types.Mixed,
  date: Date,
});

ClientDataSchema.index({ clientId: 1, topic: 1, date: 1 }, { unique: true });

module.exports =
  mongoose.models.ClientData || mongoose.model("ClientData", ClientDataSchema);
