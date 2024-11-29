import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from "path";

// mongoDB connection
import connectDB from './lib/db.js';
// routes
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import couponRoutes from './routes/coupon.route.js';
import paymentRoutes from './routes/payment.route.js';
import analyticsRoutes from './routes/analytics.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); // for parsing application/json, allows us to use req.body
app.use(cookieParser()); // for parsing cookies, allows us to use req.cookies

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on Port: ${PORT}`);
});

