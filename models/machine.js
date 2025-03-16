const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: Buffer },
  type: { type: String },
  process_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Process",
    require: true,
  },
  group_machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroupMachine",
    require: true,
  },
  min_interruption: { type: String },
  device_id: { type: String },
  description: { type: String },

});

module.exports = mongoose.model("Machine", MachineSchema);
