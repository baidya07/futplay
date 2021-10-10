const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groundSchema = new Schema({
  // _id: Schema.Type.ObjectId,
  name: String,
  address: String,
  phone: Number,
  email: String
   
});

module.exports = mongoose.model('Ground', groundSchema);
  