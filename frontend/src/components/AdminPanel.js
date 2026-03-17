import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, Users, CalendarDays, ArrowRight, Plus, X } from 'lucide-react';
import API_URL from '../config';

const AdminPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDentistForm, setShowDentistForm] = useState(false);
  const [dentistForm, setDentistForm] = useState({
    name: '',
    qualification: '',
    experience: '',
    clinicName: '',
    address: '',
    location: '',
    photoUrl: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get(`${API_URL}/api/appointments`)
      .then(res => {
        setAppointments(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load appointments.');
        setLoading(false);
      });
  };

  const handleDentistSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/api/dentists`, dentistForm)
      .then(res => {
        alert('Dentist created successfully!');
        setShowDentistForm(false);
        setDentistForm({
          name: '',
          qualification: '',
          experience: '',
          clinicName: '',
          address: '',
          location: '',
          photoUrl: ''
        });
      })
      .catch(err => {
        alert('Failed to create dentist: ' + err.message);
      });
  };

  const handleInputChange = (e) => {
    setDentistForm({
      ...dentistForm,
      [e.target.name]: e.target.value
    });
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    axios.patch(`${API_URL}/api/appointments/${appointmentId}/status`, { status: newStatus })
      .then(res => {
        // Update local state
        setAppointments(appointments.map(apt => 
          apt._id === appointmentId ? { ...apt, status: newStatus } : apt
        ));
      })
      .catch(err => {
        alert('Failed to update status: ' + err.message);
      });
  };

  if (loading) return (
    <div className="flex-center page-loading">
      <Loader2 className="spinner" size={48} />
      <p>Loading Dashboard...</p>
    </div>
  );

  return (
    <div className="page-container fade-in">
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage and view all dental appointments across clinics.</p>
        </div>
        <div className="stats-box">
          <div className="stat-item">
            <Users size={24} className="text-primary" />
            <div className="stat-info">
              <h3>{appointments.length}</h3>
              <span>Total Appointments</span>
            </div>
          </div>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setShowDentistForm(!showDentistForm)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {showDentistForm ? <X size={18} /> : <Plus size={18} />}
          {showDentistForm ? 'Cancel' : 'Add New Dentist'}
        </button>
      </div>

      {showDentistForm && (
        <div className="glass-card" style={{ marginBottom: '20px', padding: '20px' }}>
          <h2 style={{ marginBottom: '20px' }}>Add New Dentist</h2>
          <form onSubmit={handleDentistSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={dentistForm.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Qualification *</label>
                <input
                  type="text"
                  name="qualification"
                  value={dentistForm.qualification}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Experience (years) *</label>
                <input
                  type="number"
                  name="experience"
                  value={dentistForm.experience}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Clinic Name *</label>
                <input
                  type="text"
                  name="clinicName"
                  value={dentistForm.clinicName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={dentistForm.address}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={dentistForm.location}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Photo URL</label>
                <input
                  type="text"
                  name="photoUrl"
                  value={dentistForm.photoUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/photo.jpg"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Create Dentist
            </button>
          </form>
        </div>
      )}

      <div className="table-container glass-card">
        {appointments.length === 0 ? (
          <div className="empty-state">
            <CalendarDays size={48} className="text-muted" />
            <h3>No Appointments Yet</h3>
            <p>When patients book appointments, they will appear here.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Age / Gender</th>
                <th>Appointment Date</th>
                <th>Dentist Name</th>
                <th>Clinic Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.id}>
                  <td className="text-muted">#{app.id}</td>
                  <td className="font-medium">{app.patientName}</td>
                  <td>{app.age} • {app.gender}</td>
                  <td>
                    {new Date(app.appointmentDate).toLocaleString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                      hour: 'numeric', minute: 'numeric', hour12: true
                    })}
                  </td>
                  <td>
                    <div className="doctor-badge">
                      <ArrowRight size={14}/> {app.dentistName}
                    </div>
                  </td>
                  <td>{app.clinicName}</td>
                  <td>
                    <select
                      value={app.status || 'Booked'}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        backgroundColor: app.status === 'Completed' ? '#dcfce7' : app.status === 'Cancelled' ? '#fee2e2' : '#dbeafe',
                        color: app.status === 'Completed' ? '#166534' : app.status === 'Cancelled' ? '#991b1b' : '#1e40af'
                      }}
                    >
                      <option value="Booked">Booked</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
