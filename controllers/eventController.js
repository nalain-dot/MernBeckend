// controllers/eventController.js
import Event from '../models/Event.js';

// Add a new event
export const addEvent = async (req, res) => {
  try {
    const { name, date, time, venue, capacity } = req.body;
    const newEvent = new Event({ name, date, time, venue, capacity });
    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add event' });
  }
};


// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events', details: error.message });
  }
};


// Edit an event
export const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, time, venue, capacity } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, date, time, venue, capacity },
      { new: true }
    );
    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
