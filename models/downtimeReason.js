const mongoose = require("mongoose");
const downtimeReasonSchema = new mongoose.Schema({
    code:{type:String},
    category:{type:String},
    type:{type:String},
    name:{type:String},
    machine_id:{type:mongoose.Schema.ObjectId, ref:"Machine", require: true},
})
module.exports = mongoose.model("DowntimeReason", downtimeReasonSchema);