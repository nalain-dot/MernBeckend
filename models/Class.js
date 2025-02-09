// models/Class.js
import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    semester: { type: String, required: true },
    session: { type: String, required: true },
  },
  { timestamps: true }
);

const Class = mongoose.model('Class', ClassSchema);
export default Class;
