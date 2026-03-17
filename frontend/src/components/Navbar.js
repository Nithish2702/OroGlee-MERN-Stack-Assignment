import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Calendar, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Dentists', icon: <Stethoscope size={18} /> },
    { path: '/admin', label: 'Admin', icon: <Settings size={18} /> }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <div className="logo-icon">🦷</div>
          <span>OroGlee</span>
        </Link>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
