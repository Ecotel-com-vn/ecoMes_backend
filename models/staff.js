const mongoose = require("mongoose");
const StaffSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  picture: { type: Buffer },
  group_id: {type: mongoose.Schema.ObjectId, require:true},
  description: {type: String},
});
module.exports = mongoose.model("Staff", StaffSchema)
