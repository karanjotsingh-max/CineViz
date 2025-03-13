import React, { useState, useMemo } from "react";
import Plot from "react-plotly.js";
import mangaData from "../data/manga_data.json"; // Manga Dataset

function TopMangaChart() {
  const [viewType, setViewType] = useState("score"); // Default: Top by Score
  const [numManga, setNumManga] = useState(10); // Default: Top 10
  const [darkMode, setDarkMode] = useState(false);

  // Extract view name for display
  const viewName =
    viewType === "score"
      ? "Score"
      : viewType === "members"
      ? "Members"
      : "Favorites";

  // Memoize sorted data for performance improvements
  const sortedManga = useMemo(() => {
    return [...mangaData]
      .sort((a, b) => b[viewType] - a[viewType])
      .slice(0, numManga);
  }, [viewType, numManga]);

  const mangaTitles = sortedManga.map((m) => m.title);
  const values = sortedManga.map((m) => m[viewType]);

  // Define theme colors based on dark/light mode
  const paperBg = darkMode ? "#333" : "white";
  const plotBg = darkMode ? "#444" : "white";
  const textColor = darkMode ? "white" : "black";

  return (
    <div
      style={{
        textAlign: "center",
        color: textColor,
        backgroundColor: darkMode ? "#222" : "#f8f8f8",
        padding: "20px",
      }}
    >
      <h2>📖 Top Manga by {viewName}</h2>

      {/* Controls */}
      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
          style={{ padding: "8px 12px", fontSize: "14px" }}
          aria-label="Select view type"
        >
          <option value="score">Top Manga by Score</option>
          <option value="members">Top Manga by Members</option>
          <option value="favorites">Top Manga by Favorites</option>
        </select>

        <label
          style={{
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          Show Top:
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={numManga}
            onChange={(e) => setNumManga(Number(e.target.value))}
            aria-label="Number of manga"
          />
          <input
            type="number"
            value={numManga}
            onChange={(e) => setNumManga(Number(e.target.value))}
            min="5"
            max="30"
            style={{ width: "50px", padding: "4px", fontSize: "14px" }}
            aria-label="Number of manga input"
          />
        </label>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{ padding: "8px 12px", fontSize: "14px" }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Manga Chart */}
      <Plot
        data={[
          {
            type: "bar",
            x: mangaTitles,
            y: values,
            text: values.map((v) => v.toLocaleString()),
            textposition: "outside",
            hoverinfo: "x+y",
            marker: {
              color: values,
              colorscale: "Cividis",
              line: { color: "black", width: 1.5 },
            },
          },
        ]}
        layout={{
          title: `Top Manga by ${viewName}`,
          xaxis: { title: "Manga Title", tickangle: -45 },
          yaxis: { title: viewName },
          margin: { l: 80, r: 80, t: 50, b: 120 },
          paper_bgcolor: paperBg,
          plot_bgcolor: plotBg,
          font: { color: textColor },
          transition: { duration: 500, easing: "cubic-in-out" },
        }}
        style={{ width: "100%", height: "500px" }}
        useResizeHandler={true}
      />
    </div>
  );
}

export default TopMangaChart;
