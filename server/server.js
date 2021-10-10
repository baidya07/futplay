const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const nodemailer = require('nodemailer');


const users = require('./routes/api/user');
const futsalcourts = require('./routes/api/futsalcourts');
const usersession = require('./routes/api/usersession');
const bookinglists = require('./routes/api/bookinglists');
const grounds = require('./routes/api/groundapi');
const bookingapi = require('./routes/api/bookingapi');
const invitationapi = require('./routes/api/invitationapi');
const emailapi = require('./routes/api/emailapi');
const smsapi = require('./routes/api/smsapi');

/*****Body parser is used as middleware in express to handle post request*****/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     
    extended: true
  })); 

app.use(express.json());
app.use(express.urlencoded());

//DB Config
const db = require('../config/keys').mongoURI;

//Connect to Mongo 

mongoose
  .connect(db)
  .then(()=>console.log('MongoDB Connected....'))
  .catch(err => console.log(err));
  mongoose.set('debug', true);
  

//Use Routes

app.use('/api/user', users);
app.use('/api/futsalcourts',futsalcourts);
app.use('/api/login',usersession);
app.use('/api/bookinglists',bookinglists);
app.use('/api/grounds',grounds);
app.use('/api/booking',bookingapi);
app.use('/api/invite',invitationapi);
app.use('/api/email', emailapi);
app.use('/api/sms', smsapi);

// app.get('/api/customers', (request,response)=>{
//     const customers =[
//         {id:1, Firstname:"Nijar", Lastname:"Riola"},
//         {id:2, Firstname:"John", Lastname:"Sam"},
//         {id:3, Firstname:"Retro", Lastname:"Shrestha"}
//     ]
//     response.json(customers);
// })

// app.get('/api/users', (request,response)=>{
//     const users =[
//         {id:1, Firstname:"Cris", Lastname:"Riola"},
//         {id:2, Firstname:"John", Lastname:"Sam"},
//         {id:3, Firstname:"Retro", Lastname:"Shrestha"}
//     ]
//     response.json(users);
// })


app.listen(port, (err)=> {
         if(err){
             return console.log('Something bad happened', err)
            }
            console.log(`Server is listening on Port: ${port}`)
}) 

// app.post('/data',(request,response)=>{
//     console.log(request)
//     console.log(request.body)
    
//       // const data =[]
//     // request.json(data)
// })

// module.exports = app 