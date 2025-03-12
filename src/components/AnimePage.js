// src/components/AnimePage.js
import React, { useEffect, useState } from "react";
import animeData from "../data/anime_data.json";  // ✅ Fixed relative path
import AnimeGenreChart from "./AnimeGenreChart";


function AnimePage() {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    setAnime(animeData);  // ✅ Load JSON directly
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📺 Anime Analytics Dashboard</h1>
      <AnimeGenreChart anime={anime} />
    </div>
  );
}

export default AnimePage;
