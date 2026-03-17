require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dentistRoutes = require('./routes/dentistRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
// Preload the database connection
require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: "Dentist Appointment API is running!",
        status: "active",
        endpoints: {
            dentists: "/api/dentists",
            appointments: "/api/appointments"
        }
    });
});

app.use('/api/dentists', dentistRoutes);
app.use('/api/appointments', appointmentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
