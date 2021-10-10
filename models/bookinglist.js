const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const BookingListSchema = new Schema({
//     BookedBy: {
//         type: String,
//         required: true
//     },
//     Day : {
//         type:String,
//         required: true
//     },
//     Time: {
//         type: String,
//         required: true
//     },
//     Date : {
//         type: Date,
//         default:Date.now
//     }

// })


const BookingListSchema = new Schema({

  user: { 
    type:Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  futsalCourt: {
    type: Schema.Types.ObjectId,
    ref: 'FutsalCourts'
  },
  Day : {
      required : true,
      type : String
  },
  Date : { 
    type: Date, 
    required: true,
    default: Date.now
  },

    // startTime : Number,
    // endTime : Number
  Time : {
    type : Number,
    required : true

  }

});

BookingListSchema.index({futsalCourt:1, Day:1,Date:1,Time:1},{unique:true})


module.exports = mongoose.model('bookinglist', BookingListSchema)