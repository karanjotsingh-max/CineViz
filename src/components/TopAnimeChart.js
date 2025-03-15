import React, { useState, useMemo } from "react";
import Plot from "react-plotly.js";

function TopAnimeChart({ anime }) {
  const [numAnime, setNumAnime] = useState(10); // ✅ Default: Top 10
  const [minMembers, setMinMembers] = useState(10000); // ✅ Min members filter
  const [showBothTrends, setShowBothTrends] = useState(false); // ✅ Toggle for Both Trends
  const [darkMode, setDarkMode] = useState(true); // Dark mode enabled by default

  // Theme variables
  const paperBg = darkMode ? "#333" : "white";
  const plotBg = darkMode ? "#444" : "white";
  const textColor = darkMode ? "white" : "black";
  const containerBg = darkMode ? "#222" : "#f8f8f8";
  const gridColor = darkMode ? "rgba(255,255,255,0.3)" : "rgba(200,200,200,0.3)";

  // Memoized filtering and sorting logic for performance
  const filteredAnime = useMemo(() => {
    return anime
      .filter(a => a.members >= minMembers)
      .sort((a, b) => b.rating - a.rating) // Always sort by rating
      .slice(0, numAnime);
  }, [anime, numAnime, minMembers]);

  const animeNames = filteredAnime.map(a => a.name);
  const ratings = filteredAnime.map(a => a.rating);
  const members = filteredAnime.map(a => a.members);

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: containerBg, color: textColor }}>
      <h2>📊 Top Anime by Rating & Members (Line Trend)</h2>

      {/* Controls */}
      <div style={{ marginBottom: "15px", display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
        <label style={{ fontSize: "14px" }}>
          Show Top:
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={numAnime}
            onChange={(e) => setNumAnime(Number(e.target.value))}
            style={{ marginLeft: "5px", cursor: "pointer" }}
          />
          <b> {numAnime}</b>
        </label>

        <label style={{ fontSize: "14px" }}>
          Min Members:
          <input
            type="range"
            min="1000"
            max="1000000"
            step="1000"
            value={minMembers}
            onChange={(e) => setMinMembers(Number(e.target.value))}
            style={{ marginLeft: "5px", cursor: "pointer" }}
          />
          <b> {minMembers}</b>
        </label>

        <label style={{ fontSize: "14px", display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={showBothTrends}
            onChange={() => setShowBothTrends(!showBothTrends)}
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
          Show Both Trends
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

      {/* Line Trend Chart */}
      <Plot
        data={[
          {
            type: "scatter",
            mode: "lines+markers",
            x: animeNames,
            y: ratings,
            name: "Rating",
            text: ratings.map(r => `⭐ ${r.toFixed(2)}`),
            marker: { color: "blue", size: 8 },
            line: { shape: "spline", width: 3 }, // ✅ Smooth Curved Line
          },
          showBothTrends && {
            type: "scatter",
            mode: "lines+markers",
            x: animeNames,
            y: members,
            name: "Members",
            text: members.map(m => `👥 ${m.toLocaleString()}`),
            marker: { color: "red", size: 8 },
            line: { dash: "dot", width: 3 }, // ✅ Dotted Line for Members
          },
        ].filter(Boolean)} // ✅ Removes undefined datasets when "Both Trends" is off
        layout={{
          title: "Top Anime by Rating & Members (Trend Analysis)",
          xaxis: {
            title: { text: "Anime Titles", font: { size: 16, family: "Arial, sans-serif", color: textColor } },
            tickangle: -45,
            showgrid: true,
            gridcolor: gridColor,
            tickfont: { color: textColor },
          },
          yaxis: {
            title: { text: "Rating (0-10) / Total Members", font: { size: 16, family: "Arial, sans-serif", color: textColor } },
            gridcolor: gridColor,
            tickfont: { color: textColor },
          },
          margin: { l: 100, r: 80, t: 60, b: 140 }, // ✅ Adjusted Margins for Axis Title Visibility
          paper_bgcolor: paperBg,
          plot_bgcolor: plotBg,
          font: { color: textColor },
          transition: { duration: 500, easing: "cubic-in-out" }, // ✅ Smooth Animation
        }}
        style={{ width: "100%", height: "600px" }}
      />
    </div>
  );
}

export default TopAnimeChart;
