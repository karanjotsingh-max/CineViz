import React, { useState, useMemo } from "react";
import Plot from "react-plotly.js";

function TopAnimeChart({ anime }) {
  const [viewType, setViewType] = useState("members");
  const [numAnime, setNumAnime] = useState(10);
  const [darkMode, setDarkMode] = useState(true);

  const paperBg = darkMode ? "#333" : "white";
  const plotBg = darkMode ? "#444" : "white";
  const textColor = darkMode ? "white" : "black";
  const containerBg = darkMode ? "#222" : "#f8f8f8";
  const gridColor = darkMode ? "rgba(255,255,255,0.3)" : "rgba(200,200,200,0.3)";
  const netflixRed = "#E50914";

  const filteredAnime = useMemo(() => {
    return [...anime]
      .filter(a => a.members >= 500000 && !a.name.includes('Gintama') && !a.name.includes('Haikyuu')) // Ensure only anime with more than 10,000 members
      .sort((a, b) => b[viewType] - a[viewType])
      .slice(0, numAnime);
  }, [anime, numAnime, viewType]);

  const animeNames = filteredAnime.map(a => a.name);
  const values = filteredAnime.map(a => a[viewType]);

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: containerBg, color: textColor }}>
      <h2>📊 Top Anime by {viewType === "rating" ? "Rating" : "Members"}</h2>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "15px",
          padding: "10px",
        }}
      >
        {/* Filter By Selector */}
        <label style={{ fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
          Filter By:
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            style={{ padding: "8px", fontSize: "14px", borderRadius: "5px", cursor: "pointer", border: `1px solid ${netflixRed}` }}
            aria-label="Select filter type"
          >
            <option value="rating">Rating</option>
            <option value="members">Members</option>
          </select>
        </label>

        {/* Show Top Anime */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ fontSize: "14px" }}>Show Top:</label>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={numAnime}
            onChange={(e) => setNumAnime(Number(e.target.value))}
            style={{ width: "120px", cursor: "pointer", accentColor: netflixRed }}
          />
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>{numAnime}</span>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "8px 12px",
            fontSize: "14px",
            backgroundColor: netflixRed,
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Bar Chart */}
      <Plot
        data={[
          {
            type: "bar",
            x: values,
            y: animeNames,
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
          title: `Top Anime by ${viewType === "rating" ? "Rating" : "Members"}`,
          xaxis: {
            title: viewType === "rating" ? "Rating" : "Members",
            showgrid: true,
            gridcolor: gridColor,
            tickfont: { color: textColor },
            range: viewType === "rating" ? [7, 10] : undefined // Adjust for better UI in Rating filter
          },
          yaxis: {
            automargin: true,
            tickfont: { color: textColor },
          },
          margin: { l: 200, r: 80, t: 50, b: 50 }, // Adjust margin for long anime titles
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

export default TopAnimeChart;
