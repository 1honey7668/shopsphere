const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {isUserAuthenticate , authorizeRoles} = require("../controllers/userController");
const {addProduct , deleteProduct , updateProduct, getAllProducts, getProductById} = require("../controllers/productController");

router.post("/addProduct" ,isUserAuthenticate  , authorizeRoles("user") ,upload.single("image") , addProduct);
router.delete("/delete/:id" , isUserAuthenticate , authorizeRoles("admin") , deleteProduct);
router.put("/update/:id" , isUserAuthenticate , authorizeRoles("admin") , updateProduct);
router.get("/showProduct/:id" , isUserAuthenticate , authorizeRoles("user" , "admin") , getProductById);
router.get("/showAllProduct" , isUserAuthenticate , authorizeRoles("user" , "admin") , getAllProducts);




module.exports = router;