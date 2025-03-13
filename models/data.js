const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, ref: "Machine" },
  timestamp: { type: Number, required: true },
  mac_address: { type: String, required: true },
  version: { type: String, required: true },
  machineStatus: {
    machineStatus: { type: Number, required: true },
    lineStatus: { type: Number, required: true },
    factoryStatus: { type: Number, required: true },
    predictedError: { type: Number, required: true }
  },
  energyConsumption: {
    voltage: { type: Number, required: true },
    current: { type: Number, required: true }
  }
});

module.exports = mongoose.model("Data", DataSchema);
