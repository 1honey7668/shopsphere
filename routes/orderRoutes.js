const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const { isUserAuthenticate, authorizeRoles } = require("../controllers/userController");

router.post("/create", isUserAuthenticate, authorizeRoles("user"), createOrder);
router.get("/myOrders", isUserAuthenticate, getMyOrders);
router.get("/:id", isUserAuthenticate, getOrderById);
router.get("/", isUserAuthenticate, authorizeRoles("admin"), getAllOrders);
router.put("/:id", isUserAuthenticate, authorizeRoles("admin"), updateOrderStatus);


module.exports = router;