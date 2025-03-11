// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';  // ✅ Import Dummy Home Page
import MoviesPage from './MoviesPage';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex' }}>
        <Navbar />
        <div className="content" style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />  {/* ✅ Default route goes to HomePage */}
            <Route path="/movies" element={<MoviesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
