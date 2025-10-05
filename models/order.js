const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.ObjectId,
        ref : "user" ,
        required : true
    } ,

    orderItems : [
        {
            product : {
                type : mongoose.Schema.ObjectId,
                ref : "product" ,
                required : true
            },

            qty : { type : Number , required : true},
            price : {type : Number , required : true}
        }
    ],

    paymentMethod: {
      type: String,
      default: "COD"
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending"
    },
    totalPrice: {
      type: Number,
      required: true
    }
    
},

       { timestamps: true }
);

module.exports = mongoose.model("order" , orderSchema);