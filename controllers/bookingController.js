import Booking from '../models/Booking.js';
import Teacher from '../models/Teacher.js';
import mongoose from 'mongoose';

export const addBooking = async (req, res) => {
  try {
    const { studentName, fatherName, class: studentClass, semester, session, eventName, teacherID, paymentStatus } = req.body;
    
    // Validate teacherID format
    if (!mongoose.Types.ObjectId.isValid(teacherID)) {
      return res.status(400).json({ error: 'Invalid teacherID format' });
    }

    const teacher = await Teacher.findById(teacherID);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Get photo path from uploaded file
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const newBooking = new Booking({
      studentName,
      fatherName,
      class: studentClass,
      semester,
      session,
      photo,
      eventName,
      teacherID,
      paymentStatus,
    });

    await newBooking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking', details: error.message });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('teacherID', 'name email');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Generate ticket for a booking
export const generateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticketID = Math.floor(1000 + Math.random() * 9000).toString();

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { ticketID, paymentStatus: 'Done' },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json({ message: 'Ticket generated successfully', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate ticket', details: error.message });
  }
};

// Get bookings by teacher ID
export const getBookingsByTeacher = async (req, res) => {
  try {
    const { teacherID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(teacherID)) {
      return res.status(400).json({ error: 'Invalid teacherID format' });
    }

    const bookings = await Booking.find({ teacherID });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings', details: error.message });
  }
};

// Edit booking
export const editBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName, fatherName, class: studentClass, semester, session, eventName, teacherID, paymentStatus } = req.body;
    
    // Validate teacherID format
    if (teacherID && !mongoose.Types.ObjectId.isValid(teacherID)) {
      return res.status(400).json({ error: 'Invalid teacherID format' });
    }

    // Get new photo path if updated
    const photo = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedBookingData = {
      studentName,
      fatherName,
      class: studentClass,
      semester,
      session,
      eventName,
      teacherID,
      paymentStatus,
    };

    // Only update photo if a new one is uploaded
    if (photo) {
      updatedBookingData.photo = photo;
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, updatedBookingData, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking', details: error.message });
  }
};


export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting booking with ID: ${id}`); // Log the booking ID

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid booking ID format' });
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error); // Log any errors
    res.status(500).json({ error: 'Failed to delete booking', details: error.message });
  }
};

// Search booking by ticket ID
export const getBookingByTicketID = async (req, res) => {
  try {
    const { ticketID } = req.params;

    const booking = await Booking.findOne({ ticketID }).populate('teacherID', 'name email');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking', details: error.message });
  }
};
