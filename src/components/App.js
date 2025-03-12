import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import MoviesPage from "./MoviesPage";
import AnimePage from "./AnimePage";  // ✅ Import AnimePage

function App() {
  return (
    <Router basename="/CineViz">
      <div className="app-container" style={{ display: "flex" }}>
        <Navbar />
        <div className="content" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/anime" element={<AnimePage />} />  {/* ✅ New Route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
