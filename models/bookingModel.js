const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  groundId: {
    type: Schema.Types.ObjectId,
    ref: 'Ground'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: String
  },
  slots: { type: String },
  
});

// bookingSchema.index({ startTime: 1});

module.exports = mongoose.model('Booking', bookingSchema);
