// import express from "express";
// import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
// import { deleteOrder, getAllOrders, getOrderForPayment, updateOrder } from "../controllers/orderController.js";


// var router = express.Router();

// router.param('orderId', getOrderById);

// router.get(
//     '/:userId',
//     isAdmin,
//     requireSignIn,
//     getAllOrders
// );

// router.post(
//     '/create/:userId',
//     isAdmin,
//     requireSignIn,
//     getOrderForPayment
// );

// router.put(
//     '/:orderId/:userId',
//     isAdmin,
//     requireSignIn,

//     updateOrder
// );

// router.delete(
//     '/:orderId/:userId',
//     isAdmin,
//     requireSignIn,
//     deleteOrder
// );


// module.exports = router;