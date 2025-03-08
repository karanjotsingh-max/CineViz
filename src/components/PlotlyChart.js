import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

// Load API key from environment variables
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const PlotlyChart = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;

    axios.get(API_URL)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>TMDB Movie Insights</h2>

      {/* 📊 Bar Chart - Most Popular Movies */}
      <Plot
        data={[
          {
            x: movies.map(movie => movie.title),
            y: movies.map(movie => movie.popularity),
            type: "bar",
            marker: { color: "blue" },
          },
        ]}
        layout={{ title: "Most Popular Movies", width: 900, height: 500 }}
      />

      {/* 💰 Scatter Plot - Revenue vs Budget */}
      <Plot
        data={[
          {
            x: movies.map(movie => movie.budget),
            y: movies.map(movie => movie.revenue),
            mode: "markers",
            marker: { size: 10, color: "red" },
          },
        ]}
        layout={{ title: "Movie Revenue vs Budget", width: 900, height: 500 }}
      />
    </div>
  );
};

export default PlotlyChart;
