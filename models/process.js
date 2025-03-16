const mongoose = require("mongoose");
const ProcessSchema = new mongoose.Schema({
  name: { type: String, require: true },
  line_id: { type: mongoose.Schema.Types.ObjectId, ref: "Line", require: true },
  description: { type: String, require: true },
});
module.exports = mongoose.model("Process", ProcessSchema);