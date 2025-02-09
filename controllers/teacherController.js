import Teacher from '../models/Teacher.js';
import bcrypt from 'bcryptjs';
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import Class from '../models/Class.js';


// Create a new teacher
export const createTeacher = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new Teacher({ name, email, phone, password: hashedPassword });
    const savedTeacher = await teacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all teachers
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a teacher by ID
export const getTeacherById = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a teacher
export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a teacher
export const deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all bookings for a teacher
export const getTeacherBookings = async (req, res) => {
  try {
    const { teacherID } = req.params; // teacherID is passed from the frontend
    const bookings = await Booking.find({ teacherID }).populate('eventID').populate('classID');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings', details: error.message });
  }
};

// Fetch all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events', details: error.message });
  }
};

// Fetch all classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes', details: error.message });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    

    res.json({ totalBookings, totalEvents, totalTeachers , });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



