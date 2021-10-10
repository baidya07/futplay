// const { timeSchema } = require('./times');
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// const array = [ 13, 14, 15, 16 ,17 ,18 ,19 ,20 ,21 ,22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
// const array = [0 ,1 ,2 ,3 ,4, 5, 6]
const FutsalCourtSchema = new Schema({
    Name :{
        type: String,
        required: true
    },
    Address :{
        type: String,
        required: true
    },
    ContactNo :{
        type: String,
        required: true
    },
    Email :{
        type: String,
        required: true
    },
    
    Day : {
        type : String,
        required : true
    },

    Date: {
        type: Date,
        default: Date.now
    },
    

    Time : {
        First : { status : Boolean , bookedBy : String },
        Second : { status : Boolean , bookedBy : String },
        Third : { status : Boolean , bookedBy : String},
        Fourth : { status : Boolean, bookedBy : String},
        Fifth : { status : Boolean, bookedBy : String},
        Sixth : { status : Boolean, bookedBy : String},
    }
    
})
module.exports = mongoose.model('FutsalCourts', FutsalCourtSchema)