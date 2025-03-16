// src/components/GenreChart.js
import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function GenreChart({ genreLabels, genreValues, genreDetails }) {
  const [sortType, setSortType] = useState('count');
  const [filterText, setFilterText] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // Dark mode enabled by default

  // Define dark/light theme colors
  const paperBg = darkMode ? "#333" : "white";
  const plotBg = darkMode ? "#444" : "white";
  const textColor = darkMode ? "white" : "black";
  const containerBg = darkMode ? "#222" : "#f8f8f8";

  // Handle click event: open a modal with details
  const handleBarClick = (event) => {
    if (event.points && event.points.length > 0) {
      const genre = event.points[0].x;
      const count = event.points[0].y;
      setSelectedGenre({ genre, count, details: genreDetails?.[genre] });
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedGenre(null);
  };

  // Filter genres by text
  const filteredData = genreLabels.reduce(
    (acc, genre, index) => {
      if (genre.toLowerCase().includes(filterText.toLowerCase())) {
        acc.genres.push(genre);
        acc.counts.push(genreValues[index]);
      }
      return acc;
    },
    { genres: [], counts: [] }
  );

  let sortedGenres = [...filteredData.genres];
  let sortedCounts = [...filteredData.counts];

  if (sortType === 'count') {
    const sorted = sortedGenres
      .map((genre, i) => ({ genre, count: sortedCounts[i] }))
      .sort((a, b) => b.count - a.count);
    sortedGenres = sorted.map((item) => item.genre);
    sortedCounts = sorted.map((item) => item.count);
  } else {
    const sorted = sortedGenres
      .map((genre, i) => ({ genre, count: sortedCounts[i] }))
      .sort((a, b) => a.genre.localeCompare(b.genre));
    sortedGenres = sorted.map((item) => item.genre);
    sortedCounts = sorted.map((item) => item.count);
  }

  const plotData =
    chartType === 'bar'
      ? [
          {
            x: sortedGenres,
            y: sortedCounts,
            type: 'bar',
            text: sortedCounts.map(String),
            textposition: 'outside',
            marker: {
              color: sortedCounts,
              colorscale: 'Viridis',
              line: { color: 'black', width: 1.5 },
            },
            hoverinfo: 'x+y',
          },
        ]
      : [
          {
            labels: sortedGenres,
            values: sortedCounts,
            type: 'pie',
            textinfo: 'label+percent',
            hoverinfo: 'label+value',
          },
        ];

  // Update layout with dark mode settings
  const layout = {
    xaxis:
      chartType === 'bar'
        ? {
            title: { text: 'Movie Genre', font: { size: 16, family: 'Arial Black' } },
            tickangle: -45,
            showgrid: false,
            tickfont: { size: 12 },
          }
        : {},
    yaxis:
      chartType === 'bar'
        ? {
            title: { text: 'Number of Movies', font: { size: 16, family: 'Arial Black' } },
            showgrid: true,
            gridcolor: 'rgba(200, 200, 200, 0.3)',
            tickfont: { size: 12 },
          }
        : {},
    margin: { l: 60, r: 30, t: 50, b: 100 },
    bargap: 0.2,
    paper_bgcolor: paperBg,
    plot_bgcolor: plotBg,
    font: { color: textColor },
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: containerBg, color: textColor, padding: '20px' }}>
      {/* Manual Title Above Controls */}
      <h2 style={{ marginBottom: '10px' }}>📊 Genre Distribution</h2>

      {/* Controls */}
      <div
        style={{
          marginBottom: '15px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setSortType(sortType === 'count' ? 'alpha' : 'count')}
          style={{
            padding: '8px 12px',
            fontSize: '14px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Sort by {sortType === 'count' ? 'Alphabetical' : 'Movie Count'}
        </button>
        <input
          type="text"
          placeholder="Filter genres..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '14px' }}
        />
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '14px' }}
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '8px 12px',
            fontSize: '14px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Plot */}
      <Plot
        data={plotData}
        layout={layout}
        onClick={handleBarClick}
        style={{ width: '100%', height: '500px' }}
      />

      {/* Modal for detailed view */}
      {selectedGenre && (
        <div
          style={{
            position: 'fixed',
            top: '20%',
            left: '30%',
            width: '40%',
            backgroundColor: darkMode ? "#333" : "white",
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            zIndex: 1000,
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            color: textColor,
          }}
        >
          <h2>{selectedGenre.genre}</h2>
          <p>Movie Count: {selectedGenre.count}</p>
          {selectedGenre.details && (
            <div>
              <h4>Top Movies:</h4>
              <ul>
                {selectedGenre.details.topMovies.map((movie, i) => (
                  <li key={i}>{movie}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={handleCloseModal}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default GenreChart;
