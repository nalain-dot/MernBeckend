import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  class: { type: String, required: true },
  semester: { type: String, required: true },
  session: { type: String, required: true },
  photo: { type: String },
  eventName: { type: String },
  teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  ticketID: { type: String },
  paymentStatus: { type: String, enum: ['Pending', 'Done' , 'Completed'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
