import React, { useState, useMemo } from "react";
import Plot from "react-plotly.js";
import mangaData from "../data/manga_data.json"; // Manga Dataset

function TopMangaChart() {
  const [viewType, setViewType] = useState("favorites");
  const [numManga, setNumManga] = useState(10);
  const [darkMode, setDarkMode] = useState(true);

  const viewName = viewType === "score" ? "Score" : viewType === "members" ? "Members" : "Favorites";

  const sortedManga = useMemo(() => {
    return [...mangaData]
      .sort((a, b) => b[viewType] - a[viewType])
      .slice(0, numManga);
  }, [viewType, numManga]);

  const mangaTitles = sortedManga.map((m) => m.title);
  const values = sortedManga.map((m) => m[viewType]);

  // Theme Colors
  const paperBg = darkMode ? "#333" : "white";
  const plotBg = darkMode ? "#444" : "white";
  const textColor = darkMode ? "white" : "black";
  const gridColor = darkMode ? "rgba(255,255,255,0.3)" : "rgba(200,200,200,0.3)";
  const accentColor = "#E50914"; // Netflix Red

  return (
    <div style={{ textAlign: "center", color: textColor, backgroundColor: darkMode ? "#222" : "#f8f8f8", padding: "20px" }}>
      <h2>📖 Top Manga by {viewName}</h2>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px", padding: "10px", alignItems: "center" }}>
        {/* View Type Selector */}
        <label style={{ fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
          Filter By:
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            style={{ padding: "8px", fontSize: "14px", borderRadius: "5px", cursor: "pointer", border: `1px solid ${accentColor}` }}
            aria-label="Select view type"
          >
            <option value="score">Score</option>
            <option value="members">Members</option>
            <option value="favorites">Favorites</option>
          </select>
        </label>

        {/* Show Top Manga */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ fontSize: "14px" }}>Show Top:</label>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={numManga}
            onChange={(e) => setNumManga(Number(e.target.value))}
            style={{ width: "120px", cursor: "pointer", accentColor }}
            aria-label="Number of manga slider"
          />
          <input
            type="number"
            value={numManga}
            onChange={(e) => setNumManga(Number(e.target.value))}
            min="5"
            max="30"
            style={{ width: "50px", padding: "4px", fontSize: "14px", textAlign: "center", border: `1px solid ${accentColor}`, borderRadius: "5px" }}
            aria-label="Number of manga input"
          />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "8px 12px",
            fontSize: "14px",
            backgroundColor: accentColor,
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Manga Chart */}
      <Plot
        data={[
          {
            type: "bar",
            x: values,
            y: mangaTitles,
            orientation: "h", // Horizontal Bar Chart
            text: values.map((v) => v.toLocaleString()),
            textposition: "outside",
            hoverinfo: "y+x",
            marker: {
              color: values,
              colorscale: "Reds",
              line: { color: "black", width: 1.5 },
            },
          },
        ]}
        layout={{
          title: `Top Manga by ${viewName}`,
          xaxis: {
            title: viewName,
            showgrid: true,
            gridcolor: gridColor,
            tickfont: { color: textColor },
          },
          yaxis: {
            automargin: true,
            tickfont: { color: textColor },
          },
          margin: { l: 150, r: 80, t: 50, b: 50 },
          paper_bgcolor: paperBg,
          plot_bgcolor: plotBg,
          font: { color: textColor },
          transition: { duration: 500, easing: "cubic-in-out" },
        }}
        style={{ width: "100%", height: "600px" }}
        useResizeHandler={true}
      />
    </div>
  );
}

export default TopMangaChart;
