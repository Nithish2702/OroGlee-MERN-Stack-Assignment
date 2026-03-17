const express = require('express');
const Appointment = require('../models/Appointment');
const Dentist = require('../models/Dentist');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log('POST /api/appointments - Creating new appointment');
    console.log('Request data:', req.body);
    try {
        const dentist = await Dentist.findById(req.body.dentistId);
        if (!dentist) {
            console.error('Dentist not found:', req.body.dentistId);
            return res.status(404).json({ error: "Dentist not found" });
        }

        const appointment = new Appointment({
            patientName: req.body.patientName,
            age: req.body.age,
            gender: req.body.gender,
            appointmentDate: req.body.appointmentDate,
            dentistId: req.body.dentistId,
            clinicName: dentist.clinicName,
            status: req.body.status || 'Booked'
        });

        await appointment.save();
        console.log('Appointment created successfully:', appointment._id);
        
        res.status(201).json({ 
            message: "Appointment created successfully", 
            data: {
                ...appointment.toObject(),
                dentistName: dentist.name
            }
        });
    } catch (err) {
        console.error('Error creating appointment:', err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    console.log('GET /api/appointments - Fetching all appointments');
    try {
        const appointments = await Appointment.find().populate('dentistId', 'name');
        console.log(`Found ${appointments.length} appointments`);
        const formattedAppointments = appointments.map(apt => ({
            ...apt.toObject(),
            dentistName: apt.dentistId?.name
        }));
        res.json({ data: formattedAppointments });
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: err.message });
    }
});

router.patch('/:id/status', async (req, res) => {
    console.log(`PATCH /api/appointments/${req.params.id}/status - Updating status`);
    console.log('New status:', req.body.status);
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        ).populate('dentistId', 'name');
        
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        
        console.log('Status updated successfully');
        res.json({ 
            message: "Status updated successfully", 
            data: {
                ...appointment.toObject(),
                dentistName: appointment.dentistId?.name
            }
        });
    } catch (err) {
        console.error('Error updating status:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
