
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


//----------------------- middleware for user authentication ------------------------


exports.isUserAuthenticate = async (req , res , next) =>
{
   const {token } = req.cookies;

   if(!token)
   {
      return res.status(401).json({message : "please login to access this resource  "});
   }

   const decodedData = jwt.verify(token , process.env.JWT_SECRET);

   req.user = await userModel.findOne({email : decodedData.email});

   next();
}

// ----------------------- middleware for role authorization -----------------------------

exports.authorizeRoles = (...roles) =>
{
   return (req , res , next)=>{

       if(!roles.includes(req.user.role)){
        return res
        .status(403)
        .json({message : `Role : ${req.user.role} is not allowed to access this resource`}); 

       }
       next();
   }
}


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

           return res.status(200).json({
      message: "Login successful",
      token: token });
        


  
}
catch(err)
{
       console.error("error in login user" , err);
    res.status(500).json({message : "something went wrong"} )
}
};


    
 

    // register user -------------------------


// ----------------- Register User -----------------
exports.registerUser = async (req, res) => {
  try {
    let { username, email, password, name, role } = req.body;

    console.log(req.body);

    // ✅ Validate required fields
    if (!email || !password || !username || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if user already exists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    // ✅ Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Save user in DB
    const newUser = await userModel.create({
      name,
      username,
      email,
      password: hashedPassword,
      role
    });

    // ✅ Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, userid: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // optional expiry
    );

    // ✅ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production" // only send cookie over https in production
    });

    // ✅ Success response
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.logoutUser = async (req , res)=>
{
  res.clearCookie("token");

}



 

