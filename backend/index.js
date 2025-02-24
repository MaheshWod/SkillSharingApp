
// Importing necessary packages and modules
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';

// Route imports
import authRoutes from './Routes/authRoutes.js';
import categoryRoute from './Routes/categoryRoute.js';
import productRoute from './Routes/productRoute.js';
// import orderRoute from './Routes/orderRoute.js';

// Payment-related imports
import Payment from './models/paymentModel.js';
import Item from './models/itemModel.js';

// import Item from './models/itemModel.js'
import { initializeKhaltiPayment, verifyKhaltiPayment } from './Khalti.js';

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors());         // Enable CORS
app.use(morgan('dev'));  // Log HTTP requests

// Database Connection
connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/products', productRoute);
// app.use('/api/v1/orders',orderRoute)npm

// Rest API
app.get('/', (req, res) => {
    res.send('<h1>Welcome to my project</h1>');
});

app.get("/", async (req, res) => {
  //creating item for testing
  await Item.create({
    name: "Wireless Bluetooth Speaker",
    price: 500,
    inStock: true,
  });
  res.send({
    success: true,
  });
});

// route to initilize khalti payment gateway
app.post("/initialize-khali", async (req, res) => {
  try {
    //try catch for error handling
    const { itemId, totalPrice, website_url } = req.body;

    const itemData = await Item.findOne({
      _id: itemId,
      price: Number(totalPrice),
    });

    if (!itemData) {
      return res.status(400).send({
        success: false,
        message: "item not found",
      });
    }

    const purchasedItemData = await PurchasedItem.create({
      item: itemId,
      paymentMethod: "khalti",
      totalPrice: totalPrice * 100,
    });

    const paymentInitate = await initializeKhaltiPayment({
      amount: totalPrice * 100, // amount should be in paisa (Rs * 100)
      purchase_order_id: purchasedItemData._id,
      purchase_order_name: itemData.name,
      return_url: `${process.env.BACKEND_URI}/complete-khalti-payment`,
      website_url,
    });

    res.json({
      success: true,
      purchasedItemData,
      payment: paymentInitate,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

// it is our `return url` where we verify the payment done by user
app.get("/complete-khalti-payment", async (req, res) => {
  const {
    pidx,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id,
  } = req.query;

  try {
    const paymentInfo = await verifyKhaltiPayment(pidx);

    // Check if payment is completed and details match
    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete information",
        paymentInfo,
      });
    }

    // Check if payment done in valid item
    const purchasedItemData = await PurchasedItem.find({
      _id: purchase_order_id,
      totalPrice: amount,
    });

    if (!purchasedItemData) {
      return res.status(400).send({
        success: false,
        message: "Purchased data not found",
      });
    }
    await PurchasedItem.findByIdAndUpdate(
      purchase_order_id,

      {
        $set: {
          status: "completed",
        },
      }
    );

    // Create a new payment record
    const paymentData = await Payment.create({
    
      transactionId: transaction_id,
      productId: purchase_order_id,
      amount,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: "khalti",
      status: "success",
    });

    // Send success response
    res.json({
      success: true,
      message: "Payment Successful",
      paymentData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error,
    });
  }
});
app.get("/create-item", async (req, res) => {
  let itemData = await Item.create({
    name: "Headphone",
    price: 500,
    inStock: true,
    category: "vayo pardaina",
  });
  res.json({
    success: true,
    item: itemData,
  });
});



// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
