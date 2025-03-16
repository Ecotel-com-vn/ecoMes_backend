const mongoose = require("mongoose");
const GroupMachineSchema = new mongoose.Schema({
    name:{type: String},
    code:{type: String},
})
module.exports = mongoose.models.GroupMachine || mongoose.model("GroupMachine", GroupMachineSchema);