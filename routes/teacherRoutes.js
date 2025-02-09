import express from 'express';
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeacherBookings,
  getDashboardData,
  getAllEvents,
  getAllClasses,
} from '../controllers/teacherController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new teacher
router.post('/',authMiddleware('admin') ,  createTeacher);

// Get all teachers
router.get('/',authMiddleware('admin') ,  getTeachers);

// Get a teacher by ID
router.get('/:id',  getTeacherById);

// Update a teacher by ID
router.put('/:id',authMiddleware('admin') ,  updateTeacher);

// Delete a teacher by ID
router.delete('/:id',authMiddleware('admin') ,  deleteTeacher);

// Get all bookings for a teacher
router.get('/bookings/:teacherID', getTeacherBookings);

// Get all events
router.get('/events', getAllEvents);

router.get('/teacher/dash', getDashboardData);



// Get all classes
router.get('/classes', getAllClasses);

export default router;
