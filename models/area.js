const mongoose = require("mongoose");
const AreaSchema= new mongoose.Schema({
    area_id: {type:String, require:true, unique:true},
    name:{type:String, require:true},
    arena_id: { type: mongoose.Schema.Types.ObjectId, ref: "Area", required: true },
    description:{type:String, require:true},
})
module.exports = mongoose.model("Area", AreaSchema);