// src/components/WorldMap.js
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function WorldMap({ countryNames, bestMovieScores, bestMovieNames }) {
  // State for rotation, rotation speed, projection type, and pause/resume
  const [rotation, setRotation] = useState({ lon: 0, lat: 0, roll: 0 });
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(2); // degrees per update
  const [projectionType, setProjectionType] = useState('orthographic');

  // Update rotation state if rotating
  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({ ...prev, lon: (prev.lon + rotationSpeed) % 360 }));
    }, 50);
    return () => clearInterval(interval);
  }, [isRotating, rotationSpeed]);

  // When a country is clicked, show an alert with the country name
  const handleCountryClick = (event) => {
    if (event.points && event.points.length > 0) {
      const clickedCountry = event.points[0].location;
      alert(`Country: ${clickedCountry}`);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '10px' }}>🌍 Best Movie Per Country</h2>
      <p style={{ marginBottom: '20px' }}>
        Average score is indicated by color, and bubble size represents the number of movies produced.
      </p>

      {/* Interactive Controls */}
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => setIsRotating(!isRotating)}
          style={{ padding: '8px 12px', marginRight: '10px', fontSize: '14px' }}
        >
          {isRotating ? 'Pause Rotation' : 'Resume Rotation'}
        </button>
        <label style={{ marginRight: '10px', fontSize: '14px' }}>
          Rotation Speed:
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(Number(e.target.value))}
            style={{ marginLeft: '5px' }}
          />
          {rotationSpeed}°/update
        </label>
        <label style={{ fontSize: '14px' }}>
          Projection:
          <select
            value={projectionType}
            onChange={(e) => setProjectionType(e.target.value)}
            style={{ padding: '8px 12px', marginLeft: '5px' }}
          >
            <option value="orthographic">Orthographic</option>
            <option value="equirectangular">Equirectangular</option>
            <option value="mercator">Mercator</option>
          </select>
        </label>
      </div>

      <Plot
        data={[
          {
            type: 'choropleth',
            locationmode: 'country names',
            locations: countryNames,
            z: bestMovieScores,
            text: bestMovieNames,
            colorscale: 'Portland',
            autocolorscale: false,
            marker: {
              line: { color: 'rgb(180,180,180)', width: 0.5 },
            },
            colorbar: {
              // More descriptive title for the color bar
              title: {
                text: 'Best Movie Score<br>(Scale 0-10)',
                side: 'right',
                font: { size: 12, color: '#333' },
              },
              thickness: 15,
              tickfont: { size: 12, color: '#333' },
              // If you know the score range, you can force it:
              // cmin: 0,
              // cmax: 10,
            },
            hovertemplate:
              "<b>%{location}</b><br>" +
              "Best Score: %{z}<br>" +
              "Movie: %{text}<extra></extra>",
          },
        ]}
        layout={{
          geo: {
            projection: { type: projectionType, rotation: rotation },
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            showocean: true,
            oceancolor: 'rgb(176,224,230)',
            lakecolor: 'rgb(176,224,230)',
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)',
            countrywidth: 0.5,
            resolution: 50,
            scope: 'world',
          },
          margin: { l: 60, r: 30, t: 80, b: 80 },
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          annotations: [
            {
              x: 0.5,
              y: -0.1,
              xref: 'paper',
              yref: 'paper',
              text: 'Click on a country for more details.',
              showarrow: false,
              font: { size: 12, color: '#333' },
              xanchor: 'center',
              yanchor: 'top',
            },
          ],
        }}
        style={{ width: '100%', height: '700px' }}
        config={{ responsive: true }}
        onClick={handleCountryClick}
      />
    </div>
  );
}

export default WorldMap;
