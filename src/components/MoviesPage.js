// src/components/MoviesPage.js
import React, { useEffect, useState } from 'react';
import GenreChart from './GenreChart';
import BudgetGrossChart from './BudgetGrossChart';
import WorldMap from './WorldMap';
import moviesData from '../data/movies_data.json';  // ✅ Import JSON directly
import dashboardImage from '../images/moviesdashboard.png'; // ✅ Import the PNG file

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [budgetRange, setBudgetRange] = useState([0, 500000000]);
  const [sortOrder, setSortOrder] = useState("count");

  useEffect(() => {
    // ✅ Load JSON data directly (no fetch required)
    setMovies(moviesData);
    setFilteredMovies(moviesData);
  }, []);

  /*
   * 📌 Filter Movies Based on Selection
   */
  useEffect(() => {
    let filtered = movies;
    if (selectedGenre !== "All")
      filtered = filtered.filter(m => m.genre?.trim() === selectedGenre);
    if (selectedYear !== "All")
      filtered = filtered.filter(m => m.year === selectedYear);
    filtered = filtered.filter(
      m => parseInt(m.budget, 10) >= budgetRange[0] && parseInt(m.budget, 10) <= budgetRange[1]
    );
    setFilteredMovies(filtered);
  }, [selectedGenre, selectedYear, budgetRange, movies]);

  /*
   * 1️⃣ Genre Distribution
   */
  const genreCount = {};
  filteredMovies.forEach(m => {
    const genre = m.genre?.trim();
    if (genre) genreCount[genre] = (genreCount[genre] || 0) + 1;
  });
  let genreArray = Object.entries(genreCount);
  sortOrder === "count"
    ? genreArray.sort((a, b) => b[1] - a[1])
    : genreArray.sort((a, b) => a[0].localeCompare(b[0]));
  const genreLabels = genreArray.map(g => g[0]);
  const genreValues = genreArray.map(g => g[1]);

  /*
   * 2️⃣ Budget vs. Gross
   */
  const budgetValues = [], grossValues = [], voteSizes = [];
  filteredMovies.forEach(m => {
    const b = parseInt(m.budget, 10),
          g = parseInt(m.gross, 10),
          v = parseInt(m.votes, 10);
    if (!isNaN(b) && !isNaN(g) && !isNaN(v)) {
      budgetValues.push(b);
      grossValues.push(g);
      voteSizes.push(Math.sqrt(v) / 10);
    }
  });

  /*
   * 🌍 4️⃣ World Map Data
   */
  const bestMovieByCountry = {};
  filteredMovies.forEach(m => {
    const country = m.plotly_country?.trim();
    const score = parseFloat(m.score);
    if (
      country &&
      !isNaN(score) &&
      (!bestMovieByCountry[country] || score > bestMovieByCountry[country].score)
    ) {
      bestMovieByCountry[country] = { name: m.name, score };
    }
  });

  return (
    <div style={{
      backgroundColor: '#141414', // Dark Netflix-like background
      color: '#fff',              // White text color
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Replace the h1 with the PNG image */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img 
          src={dashboardImage} 
          alt="Movies Dashboard" 
          style={{
            maxWidth: '100%', 
            height: 'auto'
          }} 
        />
      </div>
      <GenreChart genreLabels={genreLabels} genreValues={genreValues} />
      <BudgetGrossChart 
        budgetValues={budgetValues} 
        grossValues={grossValues} 
        voteSizes={voteSizes} 
      />
      <WorldMap
        countryNames={Object.keys(bestMovieByCountry)}
        bestMovieScores={Object.values(bestMovieByCountry).map(m => m.score)}
        bestMovieNames={Object.values(bestMovieByCountry).map(m => m.name)}
      />
    </div>
  );
}

export default MoviesPage;