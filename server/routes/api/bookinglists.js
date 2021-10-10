const { User } = require('../../../models/User');
const  FutsalCourts  = require('../../../models/Futsal-Courts');
const { bookinglist } = require('../../../models/bookinglist')
const mongoose = require('mongoose');
const Fawn = require('fawn');


const express = require('express');
const router = express.Router();

 Fawn.init(mongoose);

//Booking List Model
const BookingList = require('../../../models/bookinglist');

//Get Booking Time from api/bookinglist



router.get('/',(req,res)=>{
//    const bookinglist = await BookingList.find({Time : } , { } )
    FutsalCourts.find()
    .then(FutsalCourts=>res.json(FutsalCourts)  ) 
});

router.get('/:time/:date', async(req, res) => {
    const fustsalCourtList = await FutsalCourts.find({Date : req.params.date , Time: req.params.time })
});




//Post Booking Time to api/bookinglists
router.post('/', async (req,res)=>{

    const user = await User.findOne({Username:req.body.Username});
    if(!user) return res.status(400).send('Invalid User');

    const futsalcourt = await FutsalCourts.findById(req.body.futsalCourtId);
    if(!futsalcourt) return res.status(400).send("invalid court");

    //  let time = (req.body.startTime + req.body.endTime)
    //  futsalcourt.time

    // const bookStatus = await futsalcourt.Time.find( { TimeInterval : {$elemMatch : { $eq : req.body.Time}}});
    
    // const bookStatus = await futsalcourt.Time.find({Date : req.body.date ,
    //      Day : req.body.day})
        //  bookStatus.Time.find((time) => {
        //      time

        //  })

    

    let bookinglist = new BookingList({
        user :  user._id,
        futsalCourt : futsalcourt._id,
        Day : req.body.Day,
        Time : req.body.Time

        // startTime : req.body.startTime,
        // endTime : req.body.endTime

    })

     let t = req.body.Time

        futsalcourt.Time.t.bookedBy = user.Username;
        futsalcourt.Time.t.status  = true;

        try{
             new Fawn.Task()
                .save('bookinglists', bookinglist)
                .save('futsalcourts', futsalcourt)
                .run();
                res.send(bookinglist)

        }
        catch(ex){
            res.status(500).send('Something Failed');
        }


    // var p1 = User.findById(req.body.userId)
    // .then((user)=> res.send(user))
    // .catch(err => res.send(err));
    // var p2 = FutsalCourts.findById(req.body.futsalCourtId)
    // .then(futsalcourt => res.send(futsalcourt))
    // .catch(err => res.send(err));

    // Promise.all([ p1 , p2])
    // .then( () => {


    //     })


    // }


    // )
    // .catch(err => console.log(err))



    // const newBookingList = new BookingList({
    //     BookedBy: req.body.BookedBy,    
    //     Day:req.body.Day,
    //     Time:req.body.Time
    // });

    // newBookingList.save()
    // .then(BookingList => res.json(BookingList));


});

router.delete('/', async(req, res) => {
    const user  = await User.findById(req.body.userId);
    if(!user) return res.status(404).send("No User");

    const futsalCourt = await FutsalCourts.findById(req.body.futsalCourtId);
    if(!futsalCourt) return res.status(404).send("No FutsalCourt");
     let t = req.body.time
    if(user.Username === futsalcourt.Time.t.bookedBy){
        futsalCourt.Time.t.bookedBy = "";
        futsalCourt.Time.t.status = false;

    }
}  )

module.exports = router;