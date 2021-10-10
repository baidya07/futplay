const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//User Model
const User =  require('../../../models/User');

//Get users from api/users
router.get('/',(req, res)=>{
    User.find()
        .then(User=> res.json(User))
});

router.get('/:Username',(req,res)=>{
 User.find({Username : req.params.Username})
        .then(User => res.json({data:User,success:true}))
})

//Post users to api/user
router.post('/', (req, res)=>{
    const {Firstname, Lastname, Email, Phonenumber, Username, Password} = req.body.users
    const newUser = new User({
        Firstname,
        Lastname,   
        Email,
        Phonenumber,
        Username,
        Password
    });

    if(!Firstname){
        return res.send({
            success: false,
            message: "Error: First Name cannot be blank."
        });
    }
    if(!Lastname){
        return res.send({
            success: false,
            message: "Error: Last Name cannot be blank."
        });
    }
    if(!Email){
        return res.send({
            success: false,
            message: "Error: Email cannot be blank."
        });
    }
    if(!Phonenumber){
        return res.send({
            success: false,
            message: "Error: Phone Number cannot be blank."
        });
    }

    if(!Username){
        return res.send({
            success: false,
            message: "Error: Username cannot be blank."
        });
    }

    if(!Password){
        return res.send({
            success: false,
            message: "Error: Password cannot be blank."
        });
    }

    newUser.Password = newUser.generateHash(Password);
    newUser.save()
    .then(Users => res.json(Users));
    });

//Delete User from api/user
router.delete('/:id',(req,res)=>{
    User.findById(req.params.id)
        .then(Users => Users.remove()
        .then(()=> res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

passport.use(new LocalStrategy(
    function(Username, Password,done){
        User.getUserByUsername(Username, function(err,user){
            if(err) throw err;
            if(user){
                return done(null, false, {message: "Unknown User"});
            }

            User.comparePassword(Password, user.Password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                }else{
                    return done(null, false, {message: "Invalid Password"});
                }
            })
        })
    }));

passport.serializeUser(function(user, done){
    done(null, user.id);
})

passport.deserializeUser(function(id, done){
    User.getUserById(id, function(err,user){
        done(err,user);
    })
})

router.post('/api/user',
    passport.authenticate('local',{sucessRedirect: '/bookingpage', failureRedirect:'/login', failureFlash: true }),
    function(req,res){
        res.redirect('/bookingpage');
    });

    
module.exports = router;