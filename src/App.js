import React from "react";
import Plot from "react-plotly.js";

function App() {
  return (
    <div>
      <h1>📊 React + Plotly.js Hello Visualization</h1>
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5,60],
            y: [10, 20, 30, 40, 50, 6],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ title: "Simple Line Chart" }}
      />
    </div>
  );
}

export default App;
