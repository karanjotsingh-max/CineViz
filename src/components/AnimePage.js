// src/components/AnimePage.js
import React, { useEffect, useState } from "react";
import animeData from "../data/anime_data.json";  // ✅ Fixed relative path
import AnimeGenreChart from "./AnimeGenreChart";
import TopAnimeChart from "./TopAnimeChart";
import TopMangaChart from "./TopMangaChart"; 
import animeDashboardImage from "../images/animedashboard.png"; // ✅ Import the PNG file

function AnimePage() {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    setAnime(animeData);  // ✅ Load JSON directly
  }, []);

  return (
    <div style={{
      backgroundColor: '#141414', // Dark Netflix-like background
      color: '#fff',              // White text color
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
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
      <AnimeGenreChart anime={anime} />
      <TopAnimeChart anime={anime} />
      <TopMangaChart />
    </div>
  );
}

export default AnimePage;
