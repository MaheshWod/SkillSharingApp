// import { Router } from "express";
// import { createItemController } from "../controller/paymentController.js";
// import {
//   completePaymentController,
//   initializePaymentController,
// } from "../controller/initializePaymentController.js";

// const paymentRouter = Router();
// paymentRouter.route("/create-items").post(createItemController);
// paymentRouter.route("/initialize").post(initializePaymentController);
// paymentRouter.route("/complete-khalti-payment").get(completePaymentController);

// export default paymentRouter;


import { Router } from "express";
import { createItemController } from "../controllers/paymentController.js";
import { completePaymentController, initializePaymentController } from "../controllers/initialPaymntController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";



const router = Router();

// Create item
router.post("/create-items", requireSignIn, isAdmin, createItemController);

// Initialize payment
router.post("/initialize", requireSignIn, initializePaymentController);

// Complete payment
router.get("/complete-khalti-payment", completePaymentController);

export default router;
