const express = require('express');
const mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;
const smsRouter = express.Router();
const cronJob = require('cron').CronJob;


const accountSid = 'ACc4d370533cf419123f752092725c0bdc';
const authToken = 'debd097b8d387f224003ac9ebe6c89b2';
const client = require('twilio')(accountSid, authToken);


smsRouter.post('/', (req,res)=>{
  client.messages
  .create({
     body: `Hello ${req.body.Username}, You have a match at ${req.body.groundname} from ${req.body.slots} please confirm the booking via email and make sure to reach there on time`,
     from: '+15056365238',
     to: `${req.body.Phonenumber}`
   })
  .then(message => console.log(message.sid))
  .done();
  res.render({message: 'Successfully sent'});
})

module.exports = smsRouter;