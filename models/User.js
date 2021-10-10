const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
   Firstname:{
       type: String,
       required: true
   },
   Lastname:{
    type: String,
    required: true
    },
    Email:{
        type: String,
        required: true,
        // unique: true
    },
    Phonenumber:{
        type: Number,
        required: true
    },
    Username:{
        type: String,
        required: true,
        // unique: true
    },
    Password:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    });

    userSchema.plugin(uniqueValidator);

    userSchema.methods.generateHash = function(Password){
        return bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null)
    }

module.exports = mongoose.model('User',userSchema);

module.exports.getUserByUsername = function(Username, callback){
    var query = {Username:Username};
    User.findOne(query,callback);
}
module.exports.getUserById = function(id, callback){
    User.findByid(id,callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);

    })
}