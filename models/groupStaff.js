const mongoose = require("mongoose");
const groupStaffSchema = new mongoose.Schema({
    name: {type:String},
    type: {type:String},
})
module.exports = mongoose.model("GroupStaff", groupStaffSchema)