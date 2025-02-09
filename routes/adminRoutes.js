import express from 'express';
import {
  getDashboardMetrics,
  registerAdmin,
  getAllAdmins,
} from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();




// Route to register a new admin
router.post("/register",  registerAdmin);

// Route to get all admins (Optional)
router.get("/",authMiddleware ,  getAllAdmins);

// Dashboard routes

router.get('/dashboard-metrics', authMiddleware(['admin' , 'teacher']), getDashboardMetrics);


// Class routes

export default router;
