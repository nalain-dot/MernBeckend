import express from 'express';
import {
  addBooking,
  generateTicket,
  getBookingsByTeacher,
  getAllBookings,
  getBookingByTicketID,
  editBooking,
  deleteBooking
} from '../controllers/bookingController.js';
import upload from '../middlewares/upload.js';


const router = express.Router();

router.post('/', upload.single('photo') ,  addBooking);
router.get('/', getAllBookings);
router.put('/generate-ticket/:id', generateTicket);
router.put('/:id',upload.single('single'), editBooking);  // Route for editing a booking
router.delete('/:id', deleteBooking);  // Route for deleting a booking
router.get('/ticket/:ticketID', getBookingByTicketID);

router.get('/teacher/:teacherID', getBookingsByTeacher);

export default router;
