const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema({
  machine_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: {type: Buffer},
  type: { type: String},
  process_id: {type: String, require: true},
  group_machine: {type: String, require: true},
});

module.exports = mongoose.model("Machine", MachineSchema);
