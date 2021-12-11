const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  idNumber : { type: String },
  nic: { type: String },
  password: { type: String},
  name: { type: String },
  fullname: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  contactNo: { type: String },
  status: { type: String },
  email: { type: String },
  positiveDate: { type: String },
  updatedQRAt: { type: String },
  notification: { type: String },
  positive: { type: Boolean },
  timestamp: { type: String },
  notificationRead: { type: Boolean },
});

module.exports = Customer = mongoose.model("customer", customerSchema);

// nic		-> idNumber
// password
// fullname	-> name
// address
// contactNo	-> phoneNumber
// status
// email
// updatedQRAt	-> positiveDate
// notification
// timestamp
// notificationRead
// notify
// positive


// ->Customer DB
// NIC / Driving Licence - Key - Log
// Name - Log
// Address
// Contact Number
// Password
// Email

