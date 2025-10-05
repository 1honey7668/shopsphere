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

    role : {
        type : String,
        enum : ["user" , "admin"],
        default : "user"
    },

    createdAt : {
        type : Date ,
        default : Date.now
    }
})

module.exports = mongoose.model("user" , userSchema);