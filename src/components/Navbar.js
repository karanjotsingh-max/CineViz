import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div
      style={{
        width: '200px',
        backgroundColor: '#f5f5f5',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              Home
            </NavLink>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <NavLink to="/movies" style={{ textDecoration: 'none' }}>
              Movies
            </NavLink>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <NavLink to="/anime" style={{ textDecoration: 'none' }}>
              Anime
            </NavLink>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <NavLink to="/tv-series" style={{ textDecoration: 'none' }}>
              TV Series
            </NavLink> {/* ✅ Added TV Series Link */}
          </li>
          <li style={{ marginBottom: '10px' }}>
            <NavLink to="/explore" style={{ textDecoration: 'none' }}>
              Explore
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
