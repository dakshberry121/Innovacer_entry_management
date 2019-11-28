const Mongoose = require("mongoose");

const visitor = new Mongoose.Schema({
  name: String, //from form
  phone: String, //from form
  email: String, //from form
  status: String, //from server
  check_in: String, //from server
  check_out: String, //from server
  host_name: String, //from form
  host_email: String,
  host_phone: String,
  host_id: Mongoose.Schema.Types.ObjectId, 
  created_at : String //from server
});

module.exports = Mongoose.model("Visitors", visitor);