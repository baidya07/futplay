const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const reservedGroundModelSchema = new Schema({
  
  date: { type: String },
  
  1: {type: Boolean},
  2: {type: Boolean},
  3: {type: Boolean},
  4: {type: Boolean},
  5: {type: Boolean},
  6: {type: Boolean},

  
  groundId: {
    type: Schema.Types.ObjectId,
    ref: 'Ground'
  },
});

//add indexing

module.exports = mongoose.model('ReservedGroundModel', reservedGroundModelSchema);
