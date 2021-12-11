const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  customerName: { type: String },
  address: { type: String },
  contactNumber: { type: String , required: true},
  email: { type: String }
});

module.exports = Customer = mongoose.model("customer", customerSchema);

// ->Customer DB
// NIC / Driving Licence - Key - Log
// Name - Log
// Address
// Contact Number
// Password
// Email

