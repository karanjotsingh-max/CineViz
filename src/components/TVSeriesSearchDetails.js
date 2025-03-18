// src/components/TVSeriesSearchDetails.js
import React, { useState, useMemo } from "react";

function TVSeriesSearchDetails({ tvList }) {
  const [searchTerm, setSearchTerm] = useState("Arcane");
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [randomRecommendation, setRandomRecommendation] = useState(null);

  // PARTIAL SEARCH
  const matchingShows = useMemo(() => {
    return tvList.filter((tv) =>
      tv.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, tvList]);

  const selectedShow = matchingShows.length > 0 ? matchingShows[0] : null;

  // Get top 10 candidates for recommendation
  const recommendationList = useMemo(() => {
    if (!selectedShow) return [];

    return tvList
      .filter((tv) => tv.title !== selectedShow.title) // Exclude selected show
      .filter((tv) => tv.Rating >= 7.0 && tv.Votes > 100000) // Ensure rating & votes
      .sort((a, b) => b.Rating - a.Rating) // Sort highest-rated first
      .slice(0, 20); // Take the top 10
  }, [selectedShow, tvList]);

  // Function to randomly pick a show from the top 10
  const handleRecommendation = () => {
    

    if (recommendationList.length > 0) {
      const randomIndex = Math.floor(Math.random() * recommendationList.length);
      setRandomRecommendation(recommendationList[randomIndex]);
      setShowRecommendation(true);
    } else {
      setRandomRecommendation(null);
      setShowRecommendation(true);
    }
  };

  return (
    <div className="text-white">
      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowRecommendation(false); // Reset recommendation when searching
          }}
          placeholder="Search TV Series (e.g. Arcane)"
          className="form-control"
          style={{ maxWidth: "300px", border: "1px solid #E50914" }}
        />
        <button className="btn btn-danger ms-2" onClick={() => setSearchTerm(searchTerm)}>
          Search
        </button>
      </div>

      {/* If no TV show found */}
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
            <button className="btn btn-danger" onClick={handleRecommendation}>
              Recommend Me
            </button>
          </div>

          {/* Show the recommendation if the user clicks the button */}
          {showRecommendation && (
            <div className="text-center">
              {randomRecommendation ? (
                <p style={{ fontSize: "1.2rem", fontWeight: "500", marginBottom: "2rem" }}>
                  <span style={{ fontWeight: "bold" }}>You should watch:</span> {randomRecommendation.title}
                </p>
              ) : (
                <p className="fst-italic text-muted" style={{ marginBottom: "2rem" }}>
                  No recommended TV series found.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TVSeriesSearchDetails;
