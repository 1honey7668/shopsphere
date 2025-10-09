const express = require("express");
const router = express.Router();
const {addToCart , getCart , removeItem , updateqty , clearCart} = require("../controllers/cartController");
const { isUserAuthenticate, authorizeRoles } = require("../controllers/userController");


router.post("/addtocart" , isUserAuthenticate , addToCart);
router.get("/" , isUserAuthenticate , getCart);

router.delete("/remove/:productId" , isUserAuthenticate , removeItem);

router.put("/update/:productId" , isUserAuthenticate , updateqty);

router.post("/clear" , isUserAuthenticate , clearCart);

module.exports = router;

