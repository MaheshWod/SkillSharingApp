
// Importing necessary packages and modules
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

// Route imports
import authRoutes from './Routes/authRoutes.js';
import categoryRoute from './Routes/categoryRoute.js';
import productRoute from './Routes/productRoute.js';
import payment from './Routes/payment.js'
import completePayment from './Routes/completePayment.js'

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors());         // Enable CORS

// Database Connection
connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/products', productRoute);


// payment ROute
app.use("/payment", payment);
app.use("/", completePayment);
// Rest API
app.get('/', (req, res) => {
    res.send('<h1>Welcome to my project</h1>');
});



// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
