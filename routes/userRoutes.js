const express = require("express");
const router = express.Router();
const {loginUser , registerUser , logoutUser} = require("../controllers/userController");
const {isUserAuthenticate , authorizeRoles} = require("../controllers/userController");

router.post('/loginUser' , loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);

module.exports = router;