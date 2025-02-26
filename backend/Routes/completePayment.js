// import { Router } from "express";
// import { completePaymentController } from "../controllers/initialPaymntController.js";


// const completePaymentRouter = Router();
// completePaymentRouter.route("/complete-khalti-payment").get(completePaymentController);

// export default completePaymentRouter;

import express from 'express';
import { completePaymentController } from '../controllers/initialPaymntController.js';

const router = express.Router();

// Complete payment route
router.get('/complete-khalti-payment', completePaymentController);

export default router;
