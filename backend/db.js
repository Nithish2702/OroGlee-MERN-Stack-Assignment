const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dentist-appointment';

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => {
        console.log('Connected to MongoDB database.');
        seedDatabase();
    })
    .catch((err) => {
        console.error('Error connecting to database:', err);
        console.error('Connection string being used:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
    });

async function seedDatabase() {
    const Dentist = require('./models/Dentist');
    
    const count = await Dentist.countDocuments();
    if (count === 0) {
        const sampleDentists = [
            {
                name: "Dr. Sarah Jenkins",
                qualification: "DDS, Orthodontics",
                experience: 12,
                clinicName: "Jenkins Dental",
                address: "123 Main St",
                location: "Downtown",
                photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200"
            },
            {
                name: "Dr. Mike Ross",
                qualification: "DMD",
                experience: 8,
                clinicName: "City Smiles",
                address: "456 Oak Ave",
                location: "Westside",
                photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200"
            },
            {
                name: "Dr. Emily Chen",
                qualification: "DDS, Periodontics",
                experience: 15,
                clinicName: "Pearl Dental Clinic",
                address: "789 Pine Rd",
                location: "North Hills",
                photoUrl: "https://images.unsplash.com/photo-1594824432474-06d2894b9175?auto=format&fit=crop&q=80&w=200&h=200"
            },
            {
                name: "Dr. James Smith",
                qualification: "DMD, Endodontics",
                experience: 5,
                clinicName: "Advanced Dental Care",
                address: "321 Elm St",
                location: "South Beach",
                photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200"
            },
            {
                name: "Dr. Aliya Rahman",
                qualification: "DDS",
                experience: 10,
                clinicName: "Smile Center",
                address: "654 Birch St",
                location: "Eastside",
                photoUrl: "https://images.unsplash.com/photo-1594824432415-4ba2b6e1610e?auto=format&fit=crop&q=80&w=200&h=200"
            }
        ];
        
        await Dentist.insertMany(sampleDentists);
        console.log("Seeded database with sample dentists.");
    }
}

module.exports = mongoose;
