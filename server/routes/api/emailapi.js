const express = require('express');
const mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;
const emailRouter = express.Router();
const nodemailer = require('nodemailer');

const Email = require('../../../models/emailModel');

emailRouter.post('/', (req,res)=>{
        const output = `
            <h2>Confirmation Mail for Reservation at ${req.body.groundname}</h2>
            <p>You have a booking at ${req.body.groundname} today from ${req.body.slots} be sure to come and play </p>
            <p>Please confirm your booking by clicking the confirm button below if you dont 
            confirm it your booking will automatically be canceled 2 hr before your reserved time</p>
            <button>Confirm Booking</button>
            <button>Cancel Booking</button>`;
            

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    port: 587,
                    // secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'futplay.project@gmail.com', // generated ethereal user
                        pass: 'projectfutplay9' // generated ethereal password
                    },
                    tls: {
                        rejectUnauthorized : false
                    }
                });
            
                // setup email data with unicode symbols
                var mailOptions = {
                    from: '"Futplay" <futplay.project@gmail.com>', // sender address
                    to: `${req.body.Email}`, // list of receivers
                    subject: 'Booking Confirmation  ✔', // Subject line
                    text: '', // plain text body
                    html: output// html body
                };
            
                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.response);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                                            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                });
    })
    // const newEmail = new emailRouter({
    //     groundName : req.body.groundName,
    //     userId: req.body.userId,
    //     userName : req.body.userName,
    //     date: req.body.date,
    //     slots: req.body.slots
    // })

    // newEmail.save()
    // .then(Email=>res.json(Email));
    // })

    module.exports = emailRouter;
