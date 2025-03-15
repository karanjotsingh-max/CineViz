// src/components/anime/AnimeGenreChart.js
import React, { useState } from "react";
import Plot from "react-plotly.js";

function AnimeGenreChart({ anime }) {
  const [sortOrder, setSortOrder] = useState("desc"); // ✅ Sorting Order
  const [filterText, setFilterText] = useState(""); // ✅ Genre Search
  const [numGenres, setNumGenres] = useState(15); // ✅ Genre Count Limit
  const [chartType, setChartType] = useState("bar"); // ✅ Dropdown Selection
  const [darkMode, setDarkMode] = useState(true); // Dark mode enabled by default

  // Theme variables
  const paperBg = darkMode ? "#333" : "white";
  const plotBg = darkMode ? "#444" : "white";
  const textColor = darkMode ? "white" : "black";
  const containerBg = darkMode ? "#222" : "#f8f8f8";
  const gridColor = darkMode ? "rgba(255,255,255,0.3)" : "rgba(200,200,200,0.3)";

  const genreCount = {};
  anime.forEach((a) => {
    a.genre.forEach((g) => {
      genreCount[g] = (genreCount[g] || 0) + 1;
    });
  });

  // Convert genre object to array and sort
  let sortedGenres = Object.entries(genreCount);
  sortedGenres.sort((a, b) =>
    sortOrder === "desc" ? b[1] - a[1] : a[1] - b[1]
  );

  // Apply search filter
  sortedGenres = sortedGenres.filter(([genre]) =>
    genre.toLowerCase().includes(filterText.toLowerCase())
  );

  // Limit the number of genres displayed
  sortedGenres = sortedGenres.slice(0, numGenres);

  const genres = sortedGenres.map((g) => g[0]);
  const counts = sortedGenres.map((g) => g[1]);

  // Calculate percentage contribution for tooltips
  const totalAnime = counts.reduce((sum, val) => sum + val, 0);
  const percentages = counts.map(
    (count) => ((count / totalAnime) * 100).toFixed(2) + "%"
  );

  return (
    <div style={{ textAlign: "center", backgroundColor: containerBg, color: textColor, padding: "20px" }}>
      <h2>📊 Anime Genre Popularity</h2>

      {/* Controls: Sorting, Search, Chart Type, Slider, Dark Mode Toggle */}
      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() =>
            setSortOrder(sortOrder === "desc" ? "asc" : "desc")
          }
          style={{
            padding: "8px 12px",
            fontSize: "14px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sort {sortOrder === "desc" ? "Ascending" : "Descending"}
        </button>

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          style={{ padding: "8px 12px", fontSize: "14px" }}
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="treemap">Treemap</option>
        </select>

        <input
          type="text"
          placeholder="Search genre..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ padding: "8px 12px", fontSize: "14px" }}
        />

        <label style={{ fontSize: "14px" }}>
          Genres to Show:
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={numGenres}
            onChange={(e) => setNumGenres(Number(e.target.value))}
            style={{ marginLeft: "5px" }}
          />
          {numGenres}
        </label>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "8px 12px",
            fontSize: "14px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Conditional Chart Rendering */}
      {chartType === "bar" && (
        <Plot
          data={[
            {
              type: "bar",
              orientation: "h",
              x: counts,
              y: genres,
              text: percentages,
              textposition: "outside",
              hoverinfo: "y+text",
              marker: {
                color: counts,
                colorscale: "Blues",
                showscale: true,
                colorbar: {
                  title: "Popularity",
                  titleside: "right",
                  font: { color: textColor },
                },
              },
              hoverlabel: {
                bgcolor: darkMode ? "#333" : "#fff",
                font: { color: darkMode ? "white" : "black" },
              },
            },
          ]}
          layout={{
            title: "Top Anime Genres (Bar Chart)",
            xaxis: {
              title: "Number of Anime",
              gridcolor: gridColor,
              tickfont: { color: textColor },
            },
            yaxis: {
              title: "Genre",
              automargin: true,
              tickfont: { color: textColor },
            },
            margin: { l: 150, r: 30, t: 50, b: 60 },
            paper_bgcolor: paperBg,
            plot_bgcolor: plotBg,
            font: { color: textColor },
          }}
          style={{ width: "100%", height: "600px" }}
        />
      )}

      {chartType === "pie" && (
        <Plot
          data={[
            {
              type: "pie",
              labels: genres,
              values: counts,
              textinfo: "label+percent",
              hoverinfo: "label+value",
              marker: { colorscale: "Blues" },
            },
          ]}
          layout={{
            title: "Top Anime Genres (Pie Chart)",
            paper_bgcolor: paperBg,
            font: { color: textColor },
          }}
          style={{ width: "100%", height: "500px" }}
        />
      )}

      {chartType === "treemap" && (
        <Plot
          data={[
            {
              type: "treemap",
              labels: genres,
              parents: Array(genres.length).fill(""),
              values: counts,
              textinfo: "label+value",
              marker: { colorscale: "Blues" },
            },
          ]}
          layout={{
            title: "Top Anime Genres (Treemap)",
            paper_bgcolor: paperBg,
            font: { color: textColor },
          }}
          style={{ width: "100%", height: "500px" }}
        />
      )}
    </div>
  );
}

export default AnimeGenreChart;
