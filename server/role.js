const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  value: { type: String, unique: true, default: "USER" },
});
const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;
