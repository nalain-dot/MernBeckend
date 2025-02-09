import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";
import adminRoutes from "./routes/adminRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";

import bookingRoutes from "./routes/bookingRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRoute from './routes/authRoutes.js';
import classRoutes from './routes/classRoutes.js';
import errorHandler from "./middlewares/errorMiddleware.js";

// Use import.meta.url to get the equivalent of __dirname
const __dirname = path.resolve();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use('/uploads', express.static(path.join(__dirname, 'public' , 'uploads')));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);

app.use('/api/classes', classRoutes);
app.use('/api/bookings', bookingRoutes); // Booking routes
app.use('/api/events', eventRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
