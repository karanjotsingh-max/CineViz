import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import MoviesPage from "./MoviesPage";

function App() {
  return (
    <Router basename="/CineViz">  {/* ✅ Keep repository name as base */}
      <div className="app-container" style={{ display: "flex" }}>
        <Navbar />
        <div className="content" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />  {/* ✅ Default landing page */}
            <Route path="/movies" element={<MoviesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
