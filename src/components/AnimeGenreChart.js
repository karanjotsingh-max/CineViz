import React, { useState } from "react";
import Plot from "react-plotly.js";

function AnimeGenreChart({ anime }) {
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterText, setFilterText] = useState("");
  const [numGenres, setNumGenres] = useState(15);
  const [chartType, setChartType] = useState("line");
  const [darkMode, setDarkMode] = useState(true);

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

  let sortedGenres = Object.entries(genreCount);
  sortedGenres.sort((a, b) =>
    sortOrder === "desc" ? b[1] - a[1] : a[1] - b[1]
  );

  sortedGenres = sortedGenres.filter(([genre]) =>
    genre.toLowerCase().includes(filterText.toLowerCase())
  );

  sortedGenres = sortedGenres.slice(0, numGenres);

  const genres = sortedGenres.map((g) => g[0]);
  const counts = sortedGenres.map((g) => g[1]);

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
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="custom-button"
        >
          Sort {sortOrder === "desc" ? "Ascending" : "Descending"}
        </button>

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="custom-select"
        >
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="treemap">Treemap</option>
        </select>

        <input
          type="text"
          placeholder="Search genre..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="custom-input"
        />

        {/* Fixed Slider Alignment */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ fontSize: "14px" }}>Genres to Show:</label>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={numGenres}
            onChange={(e) => setNumGenres(Number(e.target.value))}
            className="custom-slider"
            style={{ width: "150px" }}
          />
          <span className="badge bg-danger">{numGenres}</span>
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className="custom-button">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Conditional Chart Rendering */}
      {chartType === "line" && (
        <Plot
          data={[
            {
              type: "line",
              orientation: "h",
              x: counts,
              y: genres,
              text: percentages,
              textposition: "outside",
              hoverinfo: "y+text",
              marker: {
                color: counts,
                colorscale: "Reds",
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
            title: "Top Anime Genres (Line Chart)",
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
              marker: { colorscale: "Reds" },
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

      {/* Styles */}
      <style>
        {`
          .custom-button {
            padding: 10px 15px;
            font-size: 14px;
            background-color: #E50914;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s;
          }
          .custom-button:hover {
            background-color: #b20710;
          }
          .custom-select, .custom-slider, .custom-input {
            padding: 8px;
            font-size: 14px;
            border-radius: 8px;
            border: 1px solid #E50914;
            cursor: pointer;
          }
          .badge {
            font-size: 14px;
            padding: 5px 10px;
            border-radius: 5px;
          }
        `}
      </style>
    </div>
  );
}

export default AnimeGenreChart;
