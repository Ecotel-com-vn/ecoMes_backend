// const mongoose = require("mongoose");

// const DataSchema = new mongoose.Schema({
//   deviceId: { type: String, required: true, ref: "Machine" },
//   timestamp: { type: Number, required: true },
//   mac_address: { type: String, required: true },
//   version: { type: String, required: true },
//   machineStatus: {
//     machineStatus: { type: Number, required: true },
//     lineStatus: { type: Number, required: true },
//     factoryStatus: { type: Number, required: true },
//     predictedError: { type: Number, required: true }
//   },
//   energyConsumption: {
//     voltage: { type: Number, required: true },
//     current: { type: Number, required: true }
//   }
// });

// module.exports = mongoose.model("Data", DataSchema);
const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, ref: "Machine" },
  timestamp: { type: Date, required: true },
  productName: { type: String, required: true },
  productionOrder: { type: String, required: true },
  operator: { type: String, required: true },
  shift: { type: String, required: true },
  productOk: { type: Number, required: true },
  productNg: { type: Number, required: true },
  plannedTime: { type: Number, required: true },
  runningTime: { type: Number, required: true },
  stoppedTime: { type: Number, required: true },
  endTime: { type: Date, required: true },
  name: { type: String, required: true },
  actualOutput: { type: Number, required: true },
  statusColor: { type: String, required: true },
  faultStatus: { type: Boolean, required: true },
  faultCode: { type: String, required: true },
  faultType: { type: String, required: true },
  faultStartTime: { type: Date },
  faultEndTime: { type: Date },
  stopReason: { type: String },
  stopTime: { type: Date },
  stopButtonInfo: { type: Object },
});

module.exports = mongoose.model("Data", DataSchema);

