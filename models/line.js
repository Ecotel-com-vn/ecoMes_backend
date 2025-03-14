const mongoose = require("mongoose");
const LineSchema = new mongoose.Schema({
    line_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    area_id: { type: mongoose.Schema.Types.ObjectId, ref: "Area", required: true },
    description: { type: String },
  });
  
module.exports = mongoose.model("Line", LineSchema);