const express = require("express");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

const cookieparser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')));
app.use("/api/user" , userRoutes );
app.use("/api/Product" , productRoutes);
app.use("/api/orders" , orderRoutes);
app.use("/api/cart" , cartRoutes);


connectDB();

app.get("/" , (req , res)=>{
    res.send("hello world");
})

app.listen(process.env.PORT||5000);