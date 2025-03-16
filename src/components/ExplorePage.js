// src/pages/ExplorePage.js
import React, { useState } from "react";
import AnimeSearchDetails from "../components/AnimeSearchDetails";
import MovieSearchDetails from "../components/MovieSearchDetails";
import TVSeriesSearchDetails from "../components/TVSeriesSearchDetails";
import animeData from "../data/anime_data.json";
import movieData from "../data/movies_data.json";
import tvSeriesData from "../data/series_data.json"; // Ensure correct filename

function ExplorePage() {
  const [category, setCategory] = useState("anime"); // Default to anime

  return (
    <div className="container my-5" style={{ color: "#fff" }}>
      <h2 className="text-center mb-4">Explore</h2>

      {/* Toggle between Anime, Movies, and TV Series */}
      <div className="text-center mb-4">
        <button
          className={`btn ${category === "anime" ? "btn-danger" : "btn-outline-light"} mx-2`}
          onClick={() => setCategory("anime")}
        >
          Anime
        </button>
        <button
          className={`btn ${category === "movies" ? "btn-danger" : "btn-outline-light"} mx-2`}
          onClick={() => setCategory("movies")}
        >
          Movies
        </button>
        <button
          className={`btn ${category === "tv" ? "btn-danger" : "btn-outline-light"} mx-2`}
          onClick={() => setCategory("tv")}
        >
          TV Series
        </button>
      </div>

      {/* Render the correct component based on the selected category */}
      <div className="mx-auto" style={{ maxWidth: "700px" }}>
        {category === "anime" && <AnimeSearchDetails animeList={animeData} />}
        {category === "movies" && <MovieSearchDetails movieList={movieData} />}
        {category === "tv" && <TVSeriesSearchDetails tvList={tvSeriesData} />}
      </div>
    </div>
  );
}

export default ExplorePage;
