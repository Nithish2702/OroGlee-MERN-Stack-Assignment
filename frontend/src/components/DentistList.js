import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Award, Loader2, Filter } from 'lucide-react';

const DentistList = () => {
  const [dentists, setDentists] = useState([]);
  const [filteredDentists, setFilteredDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    minExperience: '',
    location: '',
    qualification: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/dentists')
      .then(res => {
        setDentists(res.data.data);
        setFilteredDentists(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load dentists. Ensure backend is running.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = dentists;

    // Experience filter
    if (filters.minExperience) {
      result = result.filter(dentist => dentist.experience >= parseInt(filters.minExperience));
    }

    // Location filter
    if (filters.location) {
      result = result.filter(dentist =>
        dentist.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Qualification filter
    if (filters.qualification) {
      result = result.filter(dentist =>
        dentist.qualification.toLowerCase().includes(filters.qualification.toLowerCase())
      );
    }

    setFilteredDentists(result);
  }, [filters, dentists]);

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const clearFilters = () => {
    setFilters({
      minExperience: '',
      location: '',
      qualification: ''
    });
  };

  if (loading) return (
    <div className="flex-center page-loading">
      <Loader2 className="spinner" size={48} />
      <p>Loading Best Dentists...</p>
    </div>
  );
  
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page-container fade-in">
      <header className="page-header">
        <h1>Find Your Dentist</h1>
        <p>Book an appointment with top-rated dental professionals in your area.</p>
      </header>

      {/* Search and Filter Section */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Filter size={20} style={{ color: '#4f46e5' }} />
          <h3 style={{ margin: 0 }}>Filter Dentists</h3>
        </div>

        {/* Filters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
              Min. Experience (years)
            </label>
            <select
              value={filters.minExperience}
              onChange={(e) => handleFilterChange('minExperience', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.95rem'
              }}
            >
              <option value="">Any</option>
              <option value="5">5+ years</option>
              <option value="10">10+ years</option>
              <option value="15">15+ years</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
              Qualification
            </label>
            <input
              type="text"
              placeholder="e.g., DDS, DMD"
              value={filters.qualification}
              onChange={(e) => handleFilterChange('qualification', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={clearFilters}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#f1f5f9',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '500',
                cursor: 'pointer',
                color: '#475569'
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
          Showing {filteredDentists.length} of {dentists.length} dentists
        </div>
      </div>

      <div className="dentist-grid">
        {filteredDentists.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            <p style={{ fontSize: '1.1rem' }}>No dentists found matching your criteria.</p>
          </div>
        ) : (
          filteredDentists.map(dentist => (
            <div key={dentist._id} className="dentist-card scale-up">
              <div className="card-image-wrapper">
                {dentist.photoUrl ? (
                  <img 
                    src={dentist.photoUrl} 
                    alt={dentist.name} 
                    loading="lazy" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="image-placeholder" 
                  style={{ display: dentist.photoUrl ? 'none' : 'flex' }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>👤</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{dentist.name}</div>
                  </div>
                </div>
                <div className="badge">{dentist.experience} Yrs Exp</div>
              </div>
              <div className="card-content">
                <h3>{dentist.name}</h3>
                <p className="qualification"><Award size={16}/> {dentist.qualification}</p>
                
                <div className="card-details">
                  <div className="detail-item">
                    <Briefcase size={16} />
                    <span>{dentist.clinicName}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{dentist.address}, {dentist.location}</span>
                  </div>
                </div>
                
                <div className="card-actions">
                  <Link to={`/book/${dentist._id}`} className="btn btn-primary" state={{ dentist }}>
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DentistList;
