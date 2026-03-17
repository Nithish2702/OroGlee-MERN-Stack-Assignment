const express = require('express');
const Dentist = require('../models/Dentist');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('GET /api/dentists - Fetching all dentists');
    try {
        const dentists = await Dentist.find();
        console.log(`Found ${dentists.length} dentists`);
        res.json({ data: dentists });
    } catch (err) {
        console.error('Error fetching dentists:', err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    console.log('POST /api/dentists - Creating new dentist');
    console.log('Request data:', req.body);
    try {
        const dentist = new Dentist({
            name: req.body.name,
            qualification: req.body.qualification,
            experience: req.body.experience,
            clinicName: req.body.clinicName,
            address: req.body.address,
            location: req.body.location,
            photoUrl: req.body.photoUrl
        });

        await dentist.save();
        console.log('Dentist created successfully:', dentist._id);
        res.status(201).json({ 
            message: "Dentist created successfully", 
            data: dentist 
        });
    } catch (err) {
        console.error('Error creating dentist:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
