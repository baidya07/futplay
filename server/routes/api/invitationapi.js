const express = require('express');
const mongoose = require('mongoose'),
        ObjectId = mongoose.Types.ObjectId;
const invitationRouter = express.Router();

//Invitation Model
const Invitation = require('../../../models/invitationModel')

invitationRouter.post('/',(req,res)=>{
    const newInvitation = new Invitation({
        senderId: req.body.senderId,
        recieverId: req.body.recieverId,
        senderName:req.body.senderName,
        date: req.body.date,
        slots: req.body.slots,
        groundname: req.body.groundname
    });
    newInvitation.save()
    .then(()=> res.json({message:"success"})
    )
})

invitationRouter.get('/:recieverId',(req,res)=>{
    Invitation.find({recieverId:req.params.recieverId})
    .then((data)=>{
        res.json(data)
    })
})

invitationRouter.get('/outgoing/:senderId',(req,res)=>{
    Invitation.find({senderId:req.params.senderId})
    .then((data)=>{
        res.json(data)
    })
})


module.exports = invitationRouter