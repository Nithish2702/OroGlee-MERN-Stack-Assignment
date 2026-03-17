# OroGlee Dentist Appointment Platform

A full-stack web application for booking dentist appointments with advanced filtering, admin management, and real-time status updates.

## Features

### Patient Features
- **Dentist Listing:** Browse available dentists with their details and photos
- **Advanced Filtering:** Filter dentists by experience, location, and qualification
- **Book Appointment:** Schedule appointments with preferred dentists
- **Responsive Design:** Modern UI with glassmorphism aesthetics

### Admin Features
- **Admin Dashboard:** View and manage all appointments
- **Add Dentists:** Create new dentist profiles with complete information
- **Status Management:** Update appointment status (Booked/Completed/Cancelled)
- **Real-time Updates:** Instant status changes reflected in the dashboard

## Tech Stack

### Frontend
- **React** - UI library for building interactive interfaces
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Lucide React** - Modern icon library
- **CSS3** - Custom styling with glassmorphism effects

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## Architecture

### System Architecture
```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   React     │ ◄─────► │  Express    │ ◄─────► │   MongoDB   │
│  Frontend   │  HTTP   │   Backend   │  CRUD   │   Database  │
│  (Port 3000)│         │ (Port 5000) │         │             │
└─────────────┘         └─────────────┘         └─────────────┘
```

### Project Structure
```
dentist-appointment/
├── backend/
│   ├── server.js                  # Express server entry point
│   ├── db.js                      # MongoDB connection & seeding
│   ├── models/
│   │   ├── Dentist.js            # Dentist schema & model
│   │   └── Appointment.js        # Appointment schema & model
│   ├── routes/
│   │   ├── dentistRoutes.js      # Dentist API endpoints
│   │   └── appointmentRoutes.js  # Appointment API endpoints
│   ├── .env                       # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation component
│   │   │   ├── DentistList.js    # Dentist listing with filters
│   │   │   ├── BookAppointment.js# Appointment booking form
│   │   │   └── AdminPanel.js     # Admin dashboard
│   │   ├── App.js                # Main app with routing
│   │   ├── App.css               # Component styles
│   │   └── index.css             # Global styles
│   ├── public/
│   └── package.json
│
└── README.md
```

### Database Schema

**Dentist Collection:**
```javascript
{
  name: String,
  qualification: String,
  experience: Number,
  clinicName: String,
  address: String,
  location: String,
  photoUrl: String,
  timestamps: true
}
```

**Appointment Collection:**
```javascript
{
  patientName: String,
  age: Number,
  gender: String,
  appointmentDate: String,
  dentistId: ObjectId (ref: Dentist),
  clinicName: String,
  status: String (Booked/Completed/Cancelled),
  timestamps: true
}
```

## API Endpoints

### Dentist Routes
- `GET /api/dentists` - Get all dentists
- `POST /api/dentists` - Create new dentist

### Appointment Routes
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PATCH /api/appointments/:id/status` - Update appointment status

## Setup Instructions

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (Local installation or MongoDB Atlas account)

### Installation Steps

1. **Clone the repository:**
   ```bash
   cd dentist-appointment
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/dentist-appointment
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dentist-appointment
   PORT=5000
   ```

4. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB:**
   - **Local:** Run `mongod` in a terminal
   - **Atlas:** Ensure your connection string is in `.env`

2. **Start Backend Server:**
   ```bash
   cd backend
   npm start
   ```
   Server runs on `http://localhost:5000`
   - Database automatically seeds with sample dentists on first run

3. **Start Frontend (in new terminal):**
   ```bash
   cd frontend
   npm start
   ```
   Application opens at `http://localhost:3000`

## Usage Guide

### For Patients
1. Visit `http://localhost:3000`
2. Browse dentists or use filters to find specific dentists
3. Click "Book Appointment" on a dentist card
4. Fill in patient details and select appointment date/time
5. Submit to confirm booking

### For Admins
1. Click "Admin" in the navigation bar
2. View all appointments in the dashboard
3. Click "Add New Dentist" to create dentist profiles
4. Use status dropdown to update appointment status
5. Monitor appointment statistics

## Features in Detail

### Filtering System
- **Experience Filter:** 5+, 10+, 15+ years
- **Location Filter:** Search by city/area
- **Qualification Filter:** DDS, DMD, specializations
- **Real-time Results:** Instant filtering as you type

### Status Management
- **Booked:** Initial status for new appointments
- **Completed:** Mark appointments as finished
- **Cancelled:** Track cancelled appointments
- **Color Coding:** Visual status indicators

### Image Handling
- Displays dentist photos when available
- Shows profile placeholder with name when no photo
- Automatic fallback for broken image links

## Development Notes

- Backend uses Mongoose for MongoDB operations
- Frontend uses React Hooks for state management
- API logging enabled for debugging
- CORS enabled for cross-origin requests
- Responsive design for mobile/tablet/desktop

## Future Enhancements
- Admin authentication & authorization
- Email notifications for appointments
- Calendar view for appointments
- Patient appointment history
- Payment integration
- SMS reminders

## Troubleshooting

**MongoDB Connection Issues:**
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure IP whitelist in MongoDB Atlas

**Port Already in Use:**
- Change PORT in `.env` (backend)
- Frontend port can be changed in package.json

**Dependencies Issues:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## License
MIT License

## Contact
For questions or support, please contact the development team.
