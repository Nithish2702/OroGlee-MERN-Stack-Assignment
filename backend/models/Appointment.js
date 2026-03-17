const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    dentistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentist', required: true },
    clinicName: { type: String, required: true },
    status: { type: String, enum: ['Booked', 'Completed', 'Cancelled'], default: 'Booked' }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
