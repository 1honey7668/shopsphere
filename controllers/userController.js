
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


//login user ------------------

exports.loginUser = async (req , res)=>{

    try
    {
      
    let {email , password} = req.body;

    if(!email || !password) return res.status(400).json({
        message : "all fields required"
    })

    let user = await  userModel.findOne({email : email});

    if(!user) return res.status(400).json({message : "user not found"});
    
   const isMatch =  await bcrypt.compare(password , user.password )

        if(!isMatch)
        {
            return res.status(400).json({message : "invalid credentials"});
        }
        
         let token = await  jwt.sign({email : email , userid : user._id} , process.env.JWT_SECRET);
          res.cookie("token" , token);
          console.log("user loggedIn");
        


  
}
catch(err)
{
       console.error("error in login user" , err);
    res.status(500).json({message : "something went wrong"} )
}
};


    
 

    // register user -------------------------

exports.registerUser = async (req , res)=>{

    try{
          let {username , email , password , name} = req.body;

      if (!username || !email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
       }

    let user = await userModel.findOne({email : email});

    if(user) return res.status(400).json({message : "user already registered"});

      await bcrypt.genSalt(10 , async(err , salt)=>{
        bcrypt.hash(password , salt , async(err , hash)=>{
           
            let user = userModel.create({
                name,
                username,
                email,
                password : hash
            })

            let token = await jwt.sign({email : email , userid : user._id} ,  process.env.JWT_SECRET);
            res.cookie("token" , token , {
                httpOnly : true,
                sameSite : "strict"
            });

            res.status(201).json({
                message : "user registered successfully",

            });
          
  
        });
        
       
      })}

          catch(err){
            console.error("error in register user" , err);
            res.status(500).json({message : "server error"})
          }
   
     
 };

exports.logoutUser = async (req , res)=>
{
  res.clearCookie("token");

}



 

