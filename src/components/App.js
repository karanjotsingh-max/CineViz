// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import MoviesPage from './MoviesPage';
// import WebSeriesPage from './components/WebSeriesPage';
// import AnimePage from './components/AnimePage';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex' }}>
        {/* Left‐hand Navbar */}
        <Navbar />

        {/* Main content area */}
        <div className="content" style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<MoviesPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            {/* <Route path="/web-series" element={<WebSeriesPage />} />
            <Route path="/anime" element={<AnimePage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
