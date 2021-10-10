const express  = require('express');
const mongoose = require('mongoose'),
     ObjectId = mongoose.Types.ObjectId;
const bookingRouter = express.Router();

//Booking Model 
const User = require('../../../models/User');
const Ground = require('../../../models/groundModel');
const Booking = require('../../../models/bookingModel');
const ReservedGroundModel = require('../../../models/reservedGroundModel');

bookingRouter.post('/:groundId',(req,res)=>{
    const newBooking =  new Booking({
        groundId: req.params.groundId,
        userId: req.body.userId,
        date: req.body.date,
        slots: req.body.slots
    })

    newBooking.save()
    .then(()=> 
    ReservedGroundModel.findOne({groundId: req.params.groundId, date:req.body.date})
    .then(reservedGround=> ReservedGroundModel.update({_id:reservedGround._id},{[req.body.slots]:true}).then(()=>res.json({message:'success'})))
    .catch(()=>{
        const newreservedGround = new ReservedGroundModel({
            date: req.body.date,
            groundId: req.params.groundId,
            [req.body.slots]:true
        })
        newreservedGround.save()
        .then(()=>res.send({message: "success"}))
    })
)
} )

bookingRouter.get('/:userId', (req,res)=>{
    Booking.find({userId: req.params.userId})
        .then(Booking => res.json(Booking))
        .catch(()=>{
            res.json({message: "user does not have any bookings"})
        })
})

bookingRouter.get('/:groundId/:date',(req,res)=>{
    ReservedGroundModel.findOne({groundId:req.params.groundId,date:req.params.date})
        .then(Booking=>res.json(Booking))
        .catch(()=>{
            res.send({message: "no bookings on this date"})
        })
})

bookingRouter.delete('/:bookingId',(req,res)=>{
    Booking.findById(req.params.bookingId)
    .then(book=>
        ReservedGroundModel.update({
            groundId: book.groundId,
            date: book.date,
            [book.slots]: false
        })
            .then(Booking.findByIdAndRemove(req.params.bookingId).then(()=>res.json({message:'success'}))))
})
module.exports = bookingRouter