const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  idNumber: { type: String },
  password: { type: String},
  customerName: { type: String },
  address: { type: String },
  contactNumber: { type: String },
  email: { type: String },
  status: { type: String }
});

module.exports = Customer = mongoose.model("customer", customerSchema);

// ->Customer DB
// NIC / Driving Licence - Key - Log
// Name - Log
// Address
// Contact Number
// Password
// Email

