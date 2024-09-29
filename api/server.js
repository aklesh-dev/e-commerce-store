import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// mongoDB connection
import connectDB from './lib/db.js';
// routes
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json()); // for parsing application/json, allows us to use req.body
app.use(cookieParser()); // for parsing cookies, allows us to use req.cookies

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on Port: ${PORT}`);
});

