import React, { useEffect, useState } from "react";
import tvSeriesData from "../data/series_data.json";  // ✅ Import TV Series Data
import TVGenreTrendChart from "./TVGenreTrendChart";  // 📊 Genre Popularity Chart
import TVRatingDistributionChart from "./TVRatingDistributionChart";  // 📊 Violin Chart for Ratings
import TVPopularSeriesByDecadeChart from "./TVPopularSeriesByDecadeChart";  // 📊 Most Popular TV Series by Decade
import tvDashboardImage from "../images/animedashboard.png";  // ✅ Import TV Series Dashboard Image

function TVSeriesPage() {
  const [tvSeries, setTvSeries] = useState([]);

  useEffect(() => {
    setTvSeries(tvSeriesData);  // ✅ Load JSON directly
  }, []);

  return (
    <div style={{
      backgroundColor: '#141414', // Dark Netflix-like background
      color: '#fff',              // White text color
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Dashboard Header Image */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {/* <img 
          src={tvDashboardImage} 
          alt="TV Series Analytics Dashboard" 
          style={{
            maxWidth: '100%', 
            height: 'auto'
          }} 
        /> */}
      </div>
      {/* <TVGenreTrendChart tvSeries={tvSeries} />
      <TVRatingDistributionChart tvSeries={tvSeries} /> */}
      <TVPopularSeriesByDecadeChart tvSeries={tvSeries} />
    </div>
  );
}

export default TVSeriesPage;
