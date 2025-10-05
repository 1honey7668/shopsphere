const express = require("express");
const orderModel = require("../models/order");
// const order = require("../models/order");

exports.createOrder = async(req , res)=>{

     try{
          
        const {orderItems , shippingAddress , paymentMethod , totalPrice} = req.body;

        if(!orderItems || orderItems.length === 0)
        {
            return res.status(500).json({message :" no order Items" , success : false});
        }

        const order = await orderModel.create({
            user : req.user._id,
            orderItems,
            shippingAddress,
            totalPrice,
            paymentMethod
        })
      
        res.status(201).json({
            success : true,
            message : " order placed successfully",
            order
        })
     }
     catch(error)
     {
        console.error(error);
        return res.status(500).json({success : false , message : "server error"})
     }
};

// ---------- getmyorder -------------------------

exports.getMyOrders = async (req , res)=>{
  try{
        
    const orders = await orderModel.find({user : req.user._id}).populate("orderItems.product");
    res.status(200).json({sucess : true , orders});
  }
  catch(error)
  {
    console.error(error);
    res.status(500).json({message : "server error " , success : false});
  }
};

// --------------------- GET ORDER BY ID --------------------

exports.getOrderById = async (req , res)=>{
    try{
        const order = await orderModel.findById(req.params.id)
        .populate("user","name email")
        .populate("orderItems.product");

        if(!order)
        {
            return res.status(404).json({success : false , message :"order not found"});
        }

        res.status(200).json({success : true  , order});

    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({message : "server error" , success : false});
    }
}

// -------------------- GET ALL ORDERS --------------------------

exports.getAllOrders = async (req , res)=>{
    try{
         const orders = await orderModel.find().populate("user" , "user email");
         res.status(200).json({success : true , orders});
    }
    catch(error)
    {
        console.error(error);
        res.status(400).json({success : false , message : " server error"});
    }
};
 // ---------------------------- UPDATE ORDER STATUS ( ADMIN ONLY ) ----------------

exports.updateOrderStatus = async (req , res)=>{
    try{
         const order = await orderModel.findById(req.params.id);

         if(!order)
         {
            return res.status(404).json({success : false , message : "order not found"});
         }

         order.orderStatus = req.body.status || order.orderStatus;

         if(req.body.status === "delivered")
         {
            order.paymentStatus = "Paid";
         }

         order.save();

         res.status(200).json({success : true , message : "order status updated" });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({success : false , message : "server error"});
    }
};





