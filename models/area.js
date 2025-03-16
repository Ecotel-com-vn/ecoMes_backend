const mongoose = require("mongoose");
const AreaSchema= new mongoose.Schema({
    area_id: {type:String, require:true, unique:true},
    name:{type:String, require:true},
    description:{type:String},
})
module.exports = mongoose.model("Area", AreaSchema);