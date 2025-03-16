// src/components/AnimePage.js
import React, { useEffect, useState } from "react";
import animeData from "../data/anime_data.json";   // ✅ Fixed relative path
import AnimeGenreChart from "./AnimeGenreChart";
import TopAnimeChart from "./TopAnimeChart";
import TopMangaChart from "./TopMangaChart";
import animeDashboardImage from "../images/animedashboard.png"; // ✅ Import the PNG file

function AnimePage() {
  const [anime, setAnime] = useState([]);
  const [showAnime, setShowAnime] = useState(true);

  useEffect(() => {
    setAnime(animeData); // ✅ Load JSON directly
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#141414', // Dark Netflix-like background
        color: '#fff',              // White text color
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {/* Replace the heading with the PNG image */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src={animeDashboardImage}
          alt="Anime Analytics Dashboard"
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>

      {/* Button to toggle between Anime and Manga charts */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setShowAnime(!showAnime)}
          style={{
            padding: "8px 12px",
            fontSize: "14px",
            backgroundColor: "#E50914",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {showAnime ? "Show Manga Chart" : "Show Anime Chart"}
        </button>
      </div>

      {/* Conditionally render either Anime or Manga chart */}
      {showAnime ? <TopAnimeChart anime={anime} /> : <TopMangaChart />}

      {/* Always show the Anime Genre chart below */}
      <AnimeGenreChart anime={anime} />
    
    </div>
  );
}

export default AnimePage;
