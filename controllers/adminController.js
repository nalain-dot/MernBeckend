import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Teacher from "../models/Teacher.js";
import Booking from "../models/Booking.js";
import Event from '../models/Event.js';

import Class from "../models/Class.js"; 


// Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Admin registered successfully.",
      admin: { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email },
      token, // Send the token
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error: error.message });
  }
};

// Get All Admins (Optional)
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password"); // Exclude passwords
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error: error.message });
  }
};

// Dashboard Information

// Dashboard Metrics (including Teachers, Students, Classes)
export const getDashboardMetrics = async (req, res) => {
  try {
    const totalTeachers = await Teacher.countDocuments(); // Assuming you have a Student model
    const totalClasses = await Class.countDocuments(); // Assuming you have a Class model
    const totalEvents = await Event.countDocuments();
    const totalBookings = await Booking.countDocuments();
    

    res.json({ totalTeachers, totalClasses, totalEvents , totalBookings });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
