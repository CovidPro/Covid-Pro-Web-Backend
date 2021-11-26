const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  shopName: { type: String },
  shopOwner: { type: String , required: true},
  shopAddress: { type: String },
  contactNumber: { type: String , required: true}
});

module.exports = User = mongoose.model("user", userSchema);

//     ->Users DB
// Email - Key - Log
// Password - Log
// Shop Name
// Shop Owner Name
// Contact Number
// Shop Address