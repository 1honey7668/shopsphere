const productModel = require("../models/product");



exports.addProduct = async (req , res)=>{
    try{
         const { name , description , price , category , images} = req.body;

         if(!name || !description || !price || !category || !images)
         {
            return res.status(400).json({message : "all fields required"});
         }

         const newProduct = await productModel.create({
            name ,
            description,
            price,
            category,
            images
         });

         res.status(201).json({
            success : true,
            message : "product added",
            product : newProduct
         });
   
         
    }
         catch(error)
         {
           console.error(error);
           return res.status(500).json({message : "server error"});
         }

};

exports.getAllProducts = async (req , res)=>{
    try{
          const Products = await productModel.find();

          return res.status(200).json({
            success : true,
            message : "all products listed",
            Products
          });
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "server error"
        });
    }
};

exports.getProductById = async (req , res)=>{
    try{
          const Product = await productModel.findById(req.params.id);

        if(!Product)
        {
            return res.status(500).json({ message : "product not found" });
        }

        return res.status(200).json({
            success : true,
            message : "product listed sucessfully",
            Product
        });
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "server error"
        });
    }
};





exports.deleteProduct = async(req , res)=>{
    try{
        const productId = req.params.id;
        const product = await productModel.findById(productId);

        if(!product)
        {
            return res.status(201).json(
                {
                    message : "product not found",
                    success : false
                }
            );
        }


       await product.deleteOne();

       res.status(200).json({
        success : true,
        message : "product deleted successfully"
       });

    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({
            success : false,
            message : "server error"
        });
    }};


    exports.updateProduct = async (req , res)=>{
        try{
            const { name , description , price , category , images} = req.body;

            const product = await productModel.findById(req.params.id);

            if(!product)
            {
                return res.status(500).json({
                    message : "product not found",
                    success : false
                });
            }

            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.images = images || product.images;

           await product.save();

          return res.status(200).json({
            success : true,
            message : "product updated sucessfully",
            product
          })
        }
        catch(error)
        {
           console.error(error);
           return res.status(500).json({
            success : false,
            message : "server error"
           });
        }
    }