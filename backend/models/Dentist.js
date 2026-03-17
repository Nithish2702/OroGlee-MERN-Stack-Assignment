const mongoose = require('mongoose');

const dentistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: Number, required: true },
    clinicName: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    photoUrl: { type: String }
}, { timestamps: true });

const Dentist = mongoose.model('Dentist', dentistSchema);

module.exports = Dentist;
