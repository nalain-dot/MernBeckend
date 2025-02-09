// models/Event.js
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  capacity: { type: Number, required: true },
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);

export default Event;
