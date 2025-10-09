const express = require("express");
const cartModel = require("../models/cart");
const productModel = require("../models/product");

exports.addToCart = async(req , res)=>{
   try{
         const { productId  , qty} = req.body;
         const {userId }= req.user._id;

          const  product = await productModel.findById({productId});

          if(!product)
          {
            res.status(500).json({message : "product not found" , success : false});
          }

          const cart = await cartModel.findOne({user : userId});

          if(!cart)
          {
             cart = new cartModel({
                user : userId,
                cartItems : [{product : productId , qty , price : product.price }],
                totalPrice : product.price*qty

             })
          }
          else{
                 const cartIndex = cart.cartItems.findIndex(
                    item => item.product.toString() === productId
                 )
          }

          if(cartIndex > -1)
          {
             cart.cartItems[cartIndex].qty += qty;
          }
          else{
            cart.cartItems.push({product : productId , qty  , price : product.price});
          }
 
          cart.totalPrice = cart.cartItems.reduce((sum , item) => sum + item.price * item.qty , 0);
          
          cart.save();
          
         res.status(200).json({
            success : true,
            message :"item added to cart",
            

         })
   }
   catch(error)
   {
    console.error(error);
    res.status(400).json({success:false , message :"server error"
    })
   }
};

exports.getCart = async (req , res)=>{
    try{
          const {userId} = req.user._id;

          const cart = await cartModel.findOne({user : userId}).formulate("cartItems.product");

          if(!cart)
          {
            res.status(200).json({success : true , cart :{cartItems : [] , totalPrice : 0}});
          }

          res.status(200).json({success : true  , cart});
    }
    catch(error)
    {
        console.error(error);
        res.status(400).json({success : false , message : "server error"});
    }
} 

exports.removeItem = async (req , res)=>{
    try{
          const {userId} = req.user._id;

          const {productId} = req.params;

        
          const cart = await cartModel.findOne({user : userId});

          if(!cart)
          {
            res.status(404).json({success : false , message : "cart not found" });
          }

          cart.cartItems = cart.cartItems.filter(
            item => item.product.toString() !== productId
          )

          cart.totalPrice = cart.cartItems.reduce((sum , item) => sum + item.price * item.qty , 0)

          cart.save();

          res.status(200).json({status : success , message:"product removed successfully"});
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({success : false , message :"server error"});
    }
};


exports.updateqty = async(req ,res)=>{
    try{

        const {productId , qty}  = req.body;

        const cart = await cartModel.findOne({user : req.user._id});

        if(!cart)
        {
            res.status(404).json({success : false , message : "cart not found"});
        }

        const item = await cart.cartItems.find(item => item.product.toString() === productId)

        if(!item)
        {
            res.status(404).json({success : false , message : "item not found in cart"});
        }

        item.qty = qty;

        cart.totalPrice = cart.cartItems.reduce((sum , item) => sum + item.price * item.qty)

        cart.save();

        res.status(200).json({success : true , message : "quantity updated sucessfully" , cart});

    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({success : false , message : "server error"});
    }
}

exports.clearCart = async (req , res)=>{
    try{
          const {userId} = req.user._id;

          const cart = await cartModel.findOne({user : userId});

          if(!cart)
          {
            res.status(404).json({success : false , message : "cart not found"});

          }

          cart.cartItems = [];
          cart.totalPrice = 0;

          cart.save();

          res.status(200).json({success : true , cart});
    }
    catch(error)
    { 
        console.error(error);
        res.status({status : false , message : "server error"});
    }
};