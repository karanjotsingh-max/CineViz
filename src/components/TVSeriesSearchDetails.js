// src/components/TVSeriesSearchDetails.js
import React, { useState, useMemo } from "react";

function TVSeriesSearchDetails({ tvList }) {
  const [searchTerm, setSearchTerm] = useState("Arcane");
  const [showRecommendation, setShowRecommendation] = useState(false);

  // PARTIAL SEARCH
  const matchingShows = useMemo(() => {
    return tvList.filter((tv) =>
      tv.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, tvList]);

  const selectedShow = matchingShows.length > 0 ? matchingShows[0] : null;

  // Recommendation Logic
  const recommendation = useMemo(() => {
    if (!selectedShow) return null;

    return tvList
      .filter((tv) => tv.title !== selectedShow.title)
      .filter((tv) => tv.Rating >= 8.0 && tv.Votes > 200000)
      .sort((a, b) => b.Rating - a.Rating)[0] || null;
  }, [selectedShow, tvList]);

  return (
    <div className="text-white">
      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowRecommendation(false);
          }}
          placeholder="Search TV Series (e.g. Arcane)"
          className="form-control"
          style={{ maxWidth: "300px", border: "1px solid #E50914" }}
        />
        <button className="btn btn-danger ms-2" onClick={() => setSearchTerm(searchTerm)}>
          Search
        </button>
      </div>

      {!selectedShow ? (
        <p className="text-muted fst-italic text-center">No TV Series found.</p>
      ) : (
        <>
          {/* TV Show Card */}
          <div className="card bg-dark text-white mb-4 shadow-lg">
            <div className="card-header text-white bg-danger">{selectedShow.title}</div>
            <div className="card-body">
              <p><strong>Release Year:</strong> {selectedShow.releaseYear}</p>
              <p><strong>Genres:</strong> {selectedShow.genres.join(", ")}</p>
              <p><strong>Rating:</strong> {selectedShow.Rating}</p>
              <p><strong>Votes:</strong> {selectedShow.Votes.toLocaleString()}</p>
            </div>
          </div>

          {/* Recommend Me Button */}
          <div className="text-center mb-3">
            <button className="btn btn-danger" onClick={() => setShowRecommendation(true)}>
              Recommend Me
            </button>
          </div>

          {showRecommendation && recommendation && (
            <p className="text-center" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              You should watch: {recommendation.title}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default TVSeriesSearchDetails;
