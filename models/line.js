const mongoose = require("mongoose");
const LineSchema= new mongoose.Schema({
    line_id: {type:String, require:true, unique:true},
    name:{type:String, require:true},
    arena_id: { type: mongoose.Schema.Types.ObjectId, ref: "Arena", required: true },
    description:{type:String, require:true},
})
module.exports = mongoose.model("Line", LineSchema);