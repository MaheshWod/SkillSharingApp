import express from 'express'
import {registerController,loginController,testController,forgotPasswordController, updateProfileController} from '../controllers/authControllers.js'
import { requireSignIn,isAdmin } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.post('/forgot-password',forgotPasswordController)
// user ko lagi dashboard and protected route ko lagi
router.get("/user-auth",requireSignIn, (req,res)=>{
    res.status(200).send({
        ok:true
    })
})

// AdminDashboard ko lagi//
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
router.get('/test',requireSignIn,isAdmin,testController)



// user ko lagi

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
// router.get("/orders", requireSignIn, getOrdersController);

// //all orders
// router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// // order status update
// router.put(
//   "/order-status/:orderId",
//   requireSignIn,
//   isAdmin,
//   orderStatusController
// );


export default router