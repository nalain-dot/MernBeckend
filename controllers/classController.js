// controllers/classController.js
import Class from '../models/Class.js';

// Add a new class
export const addClass = async (req, res) => {
  try {
    const { name, semester, session } = req.body;
    const newClass = new Class({ name, semester, session });
    await newClass.save();
    res.status(201).json({ message: 'Class added successfully', class: newClass });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add class' });
  }
};

// Get all classes
// Get all classes
export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes', details: error.message });
  }
};

// Edit a class
export const editClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, semester, session } = req.body;
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { name, semester, session },
      { new: true }
    );
    res.status(200).json({ message: 'Class updated successfully', class: updatedClass });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update class' });
  }
};

// Delete a class
export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    await Class.findByIdAndDelete(id);
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete class' });
  }
};
