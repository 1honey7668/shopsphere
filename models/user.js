const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username :
    {
        type : String,
        required : true,
        unique : true ,
        trim : true
    },

    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },

    password : {
        type : String,
        required : true,
        minlength : 6
    },

    createdAt : {
        type : Date ,
        dafault : Date.now
    }
})

module.exports = mongoose.model("user" , userSchema);