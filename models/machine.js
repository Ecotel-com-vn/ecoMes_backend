const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive", "maintenance"], default: "active" },
  location: { type: String },
  installedDate: { type: Date, default: Date.now },
  lastMaintenance: { type: Date },
  metadata: { type: mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model("Machine", MachineSchema);
