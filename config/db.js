const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected");
    }
    catch(e){
     
        console.log("error connecting to db" , e.message);
        process.exit(1);
    }
};

module.exports = connectDB;