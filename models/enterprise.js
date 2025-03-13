const mongoose = require("mongoose");
const EnterpriseSchema = new mongoose.Schema({
  enterprise_id: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  address: { type: String, require: true },
  phone: { type: String, require: true },
  email: { type: String, require: true },
  logo: { type: Buffer },
  icon_logo: { type: Buffer },
  app_info: { type: String, require: true },
});
module.exports = mongoose.model("Enterprise", EnterpriseSchema);
