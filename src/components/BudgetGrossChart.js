// src/components/BudgetGrossChart.js
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function BudgetGrossChart() {
  const [movies, setMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState(""); 
  const [loading, setLoading] = useState(true);

  // 1. Fetch movie data from the JSON file
  useEffect(() => {
    fetch('/data/movies_data.json')
      .then(resp => resp.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching movies:', err);
        setLoading(false);
      });
  }, []);

  // 2. Once movies are loaded, set the default year to the maximum year in the dataset
  useEffect(() => {
    if (movies.length > 0 && selectedYear === "") {
      const maxYear = String(Math.max(...movies.map(m => Number(m.year))));
      setSelectedYear(maxYear);
    }
  }, [movies, selectedYear]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movies.length) {
    return <div>No movie data available.</div>;
  }

  // 3. Extract unique years from the movie data and sort them numerically
  const years = Array.from(new Set(movies.map(m => m.year))).sort((a, b) => Number(a) - Number(b));

  // 4. Filter movies for the selected year
  const moviesForYear = movies.filter(m => m.year === selectedYear);

  // 5. Sort by votes (descending) and take the top 20
  const topMovies = [...moviesForYear]
    .sort((a, b) => Number(b.votes) - Number(a.votes))
    .slice(0, 20);

  // 6. Prepare chart data
  const budgetValues = topMovies.map(m => parseInt(m.budget, 10));
  const grossValues = topMovies.map(m => parseInt(m.gross, 10));
  const voteSizes = topMovies.map(m => Math.sqrt(Number(m.votes)) / 10);
  const titles = topMovies.map(m => m.name);

  // 7. Plotly data: color scale based on budget (optional)
  const plotData = [
    {
      x: budgetValues,
      y: grossValues,
      mode: 'markers',
      type: 'scatter',
      text: titles,
      hovertemplate:
        "<b>%{text}</b><br>" +
        "Budget: $%{x:,.0f}<br>" +
        "Gross: $%{y:,.0f}<br>" +
        "<extra></extra>",
      marker: {
        size: voteSizes,
        sizemode: 'area',
        sizeref: 0.1,
        color: budgetValues,
        colorscale: 'Blues',
        showscale: true,
        colorbar: {
          title: 'Budget ($)',
          titleside: 'right',
        },
        line: {
          color: '#333',
          width: 1,
        },
      },
    },
  ];

  // 8. Layout without the built-in title (we'll use a manual <h2> above)
  const layout = {
    xaxis: {
      title: { text: 'Budget ($)', font: { size: 16, family: 'Arial Black' } },
      gridcolor: 'rgba(200, 200, 200, 0.3)',
    },
    yaxis: {
      title: { text: 'Gross ($)', font: { size: 16, family: 'Arial Black' } },
      gridcolor: 'rgba(200, 200, 200, 0.3)',
    },
    margin: { l: 60, r: 30, t: 50, b: 60 },
    paper_bgcolor: '#fff',
    plot_bgcolor: '#fff',
    transition: {
      duration: 500,
      easing: 'cubic-in-out',
    },
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Title above the dropdown and chart */}
      <h2 style={{ marginBottom: '10px' }}>
        Budget vs. Gross (Top {topMovies.length} Movies in {selectedYear})
      </h2>

      {/* Year Dropdown below the title, above the chart */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="yearSelect" style={{ marginRight: '10px' }}>
          Select Year:
        </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{ padding: '8px', fontSize: '14px' }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Bubble Chart */}
      <Plot
        data={plotData}
        layout={layout}
        style={{ width: '100%', height: '500px' }}
        config={{ responsive: true }}
      />
    </div>
  );
}

export default BudgetGrossChart;
