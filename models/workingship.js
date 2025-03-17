const mongoose = require("mongoose");

const WorkingShipSchema = new mongoose.Schema({
  name: { type: String, require: true },
  timezone: { type: String },
  dates: { type: Date },
  start_time: { type: String },
  end_time: { type: String },
  updated: { type: String },
  machine_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
    require: true,
  },
});

module.exports = mongoose.model("WorkingShip", WorkingShipSchema);
