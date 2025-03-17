const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  tool: { type: String },
  name: { type: String },
  image: { type: Buffer },
  cavity: { type: String },
  cycle_time: { type: Number },
  version: { type: String },
  marterial: { type: String },
  group_machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroupMachine",
    require: true,
  },
  attach_file: { type: String },
  description: { type: String },
});
module.exports = mongoose.model("Product", ProductSchema);
