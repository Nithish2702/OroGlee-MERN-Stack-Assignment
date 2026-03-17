import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, Calendar as CalendarIcon, User, Layers, ShieldCheck } from 'lucide-react';

const BookAppointment = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [dentist, setDentist] = useState(location.state?.dentist || null);
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'Male',
    appointmentDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If dentist object wasn't passed via React Router state, fetch it
    // In a real app we'd have a specific GET /api/dentist/:id route
    if (!dentist) {
      axios.get('http://localhost:5000/api/dentists')
        .then(res => {
          const found = res.data.data.find(d => d._id.toString() === id);
          if (found) setDentist(found);
          else setError("Dentist not found");
        })
        .catch(() => setError("Failed to load dentist information."));
    }
  }, [id, dentist]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      dentistId: dentist._id,
      age: parseInt(formData.age, 10)
    };

    axios.post('http://localhost:5000/api/appointments', payload)
      .then(res => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch(err => {
        setLoading(false);
        setError(err.response?.data?.error || "An error occurred while booking. Please try again.");
      });
  };

  if (!dentist && !error) return <div className="page-container"><p>Loading dentist data...</p></div>;
  if (error && !dentist) return <div className="page-container"><div className="error-message">{error}</div></div>;

  return (
    <div className="page-container fade-in">
      <div className="booking-layout">
        
        <div className="booking-sidebar">
          <div className="profile-summary glass-card">
            <img src={dentist.photoUrl} alt={dentist.name} className="profile-avatar" />
            <h2>{dentist.name}</h2>
            <p className="text-muted">{dentist.qualification}</p>
            <hr />
            <div className="info-list">
              <div className="info-item">
                <User size={18} />
                <span>{dentist.experience} Years Experience</span>
              </div>
              <div className="info-item">
                <Layers size={18} />
                <span>{dentist.clinicName}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-form-wrapper glass-card">
          {success ? (
            <div className="success-message fade-in flex-center column">
              <ShieldCheck size={64} className="text-green" />
              <h2>Appointment Confirmed!</h2>
              <p>Your appointment with {dentist.name} has been successfully booked.</p>
              <p className="redirect-text">Redirecting you to the home page...</p>
            </div>
          ) : (
            <>
              <h2>Book an Appointment</h2>
              <p className="text-muted mb-6">Fill in your details below to secure your slot.</p>
              
              {error && <div className="error-message mb-4">{error}</div>}
              
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input 
                    type="text" 
                    name="patientName" 
                    required 
                    placeholder="John Doe"
                    value={formData.patientName} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Age</label>
                    <input 
                      type="number" 
                      name="age" 
                      required 
                      min="1" max="120"
                      placeholder="30"
                      value={formData.age} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Appointment Date & Time</label>
                  <div className="input-with-icon">
                    <CalendarIcon size={18} className="input-icon" />
                    <input 
                      type="datetime-local" 
                      name="appointmentDate" 
                      required 
                      value={formData.appointmentDate} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block p-4 mt-6" disabled={loading}>
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
