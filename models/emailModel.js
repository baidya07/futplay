const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  groundId: {
    type: Schema.Types.ObjectId,
    ref: 'Ground'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  groundName:{ 
      type:String
  },

  userName :{
        type:String
   },

  date: {
    type: String
  },
  slots: { type: String },
  
});

module.exports = mongoose.model('Email', emailSchema);
