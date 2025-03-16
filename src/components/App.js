// src/App.js
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import React, { useState } from "react";
import HomePage from "./HomePage";
import MoviesPage from "./MoviesPage";
import AnimePage from "./AnimePage";
import TVSeriesPage from "./TVSeriesPage";
import ExplorePage from "./ExplorePage"; // <-- import the new page
import "bootstrap/dist/css/bootstrap.min.css";
import AnimatedImage from "./AnimatedImage";

function Navbar({ collapsed, toggleNavbar }) {
  const buttonClass = ({ isActive }) =>
    isActive ? "btn btn-danger mb-2 w-100" : "btn btn-outline-light mb-2 w-100";

  return (
    <div
      style={{
        width: collapsed ? "50px" : "200px",
        backgroundColor: "#000",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "width 0.3s ease",
      }}
    >
      <div style={{ padding: collapsed ? "10px" : "20px" }}>
        <button className="btn btn-outline-light mb-2" onClick={toggleNavbar}>
          {collapsed ? ">" : "<"}
        </button>

        {!collapsed && (
          <nav className="d-flex flex-column">
            <NavLink to="/" className={buttonClass}>
              Home
            </NavLink>
            <NavLink to="/movies" className={buttonClass}>
              Movies
            </NavLink>
            <NavLink to="/anime" className={buttonClass}>
              Anime
            </NavLink>
            <NavLink to="/tv-series" className={buttonClass}>
              TV Series
            </NavLink>
            {/* NEW LINK for Explore */}
            <NavLink to="/explore" className={buttonClass}>
              Explore
            </NavLink>
          </nav>
        )}
      </div>
      {!collapsed && <AnimatedImage />}
    </div>
  );
}

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleNavbar = () => setCollapsed((prev) => !prev);

  return (
    <Router basename="/CineViz">
      <div className="d-flex" style={{ backgroundColor: "black", minHeight: "100vh" }}>
        <Navbar collapsed={collapsed} toggleNavbar={toggleNavbar} />
        <div
          className="flex-grow-1 p-3 text-white"
          style={{
            backgroundColor: "#141414",
            marginLeft: collapsed ? "50px" : "200px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/anime" element={<AnimePage />} />
            <Route path="/tv-series" element={<TVSeriesPage />} />
            {/* NEW ROUTE for /explore */}
            <Route path="/explore" element={<ExplorePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
