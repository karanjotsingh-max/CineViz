import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function TVPopularSeriesByDecadeChart({ tvSeries }) {
  // Extract unique decades and years
  const decades = [...new Set(tvSeries.map(series => Math.floor(Number(series.releaseYear) / 10) * 10))].sort();
  const years = [...new Set(tvSeries.map(series => Number(series.releaseYear)).filter(year => !isNaN(year)))].sort();

  // Determine the default year (prefer 2021, otherwise latest year)
  const defaultYear = years.includes(2021) ? 2021 : Math.max(...years);

  // State for user selections
  const [filterType, setFilterType] = useState("year");
  const [selectedDecade, setSelectedDecade] = useState(decades[0]);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [numShows, setNumShows] = useState(10);
  const [sortMetric, setSortMetric] = useState("Votes");
  const [darkMode, setDarkMode] = useState(true);

  // Ensure state updates correctly when data is available
  useEffect(() => {
    if (!years.includes(selectedYear)) {
      setSelectedYear(defaultYear);
    }
  }, [tvSeries, defaultYear, selectedYear, years]);

  // Filter data for selected decade or year
  const filteredData = tvSeries
    .filter(series => filterType === "decade"
      ? Math.floor(Number(series.releaseYear) / 10) * 10 === selectedDecade
      : Number(series.releaseYear) === selectedYear)
    .sort((a, b) => b[sortMetric] - a[sortMetric])
    .slice(0, numShows);

  // Extract data for plotting
  const titles = filteredData.map(series => series.title);
  const values = filteredData.map(series => series[sortMetric]);

  // Keep original color settings
  const paperBg = darkMode ? "#333" : "white";
  const plotBg = darkMode ? "#444" : "white";
  const textColor = darkMode ? "white" : "black";
  const containerBg = darkMode ? "#222" : "#f8f8f8";
  const gridColor = darkMode ? "rgba(255,255,255,0.3)" : "rgba(200,200,200,0.3)";

  return (
    <div style={{ textAlign: "center", backgroundColor: containerBg, color: textColor, padding: "20px" }}>
      <h2>📺 Most Popular TV Series</h2>

      {/* Controls: Filter Type, Decade/Year, Show Count, Sorting, Dark Mode */}
      <div style={{
        marginBottom: "15px",
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        <button
          onClick={() => setFilterType(filterType === "year" ? "decade" : "year")}
          className="custom-button"
        >
          Filter: {filterType === "year" ? "By Year" : "By Decade"}
        </button>

        {filterType === "decade" ? (
          <select value={selectedDecade} onChange={(e) => setSelectedDecade(Number(e.target.value))} className="custom-select">
            {decades.map(decade => (
              <option key={decade} value={decade}>{decade}s</option>
            ))}
          </select>
        ) : (
          <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="custom-select">
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        )}

        <select value={sortMetric} onChange={(e) => setSortMetric(e.target.value)} className="custom-select">
          <option value="Votes">Sort by Votes</option>
          <option value="Rating">Sort by Rating</option>
        </select>

        {/* Updated Slider Alignment */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ fontSize: "14px" }}>Number of Shows:</label>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={numShows}
            onChange={(e) => setNumShows(Number(e.target.value))}
            className="custom-slider"
            style={{ width: "150px" }}
          />
          <span className="badge bg-danger">{numShows}</span>
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className="custom-button">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Bar Chart Rendering Only */}
      <Plot
        data={[
          {
            type: "bar",
            orientation: "h",
            y: titles,
            x: values,
            text: values.map(v => v.toLocaleString()),
            textposition: "outside",
            hoverinfo: "y+x",
            marker: {
              color: values,
              colorscale: "Reds",
              showscale: true,
              colorbar: {
                title: "Popularity",
                titleside: "right",
                font: { color: textColor },
              },
            },
          },
        ]}
        layout={{
          title: `Most Popular TV Series (${filterType === "decade" ? `${selectedDecade}s` : selectedYear})`,
          xaxis: { title: sortMetric, gridcolor: gridColor, tickfont: { color: textColor } },
          yaxis: { title: "TV Series", automargin: true, tickfont: { color: textColor } },
          margin: { l: 200, r: 30, t: 50, b: 60 },
          paper_bgcolor: paperBg,
          plot_bgcolor: plotBg,
          font: { color: textColor },
        }}
        style={{ width: "100%", height: "600px" }}
      />

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
          .custom-select, .custom-slider {
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

export default TVPopularSeriesByDecadeChart;
