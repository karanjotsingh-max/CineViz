// src/components/MovieSearchDetails.js
import React, { useState, useMemo } from "react";

function MovieSearchDetails({ movieList }) {
  const [searchTerm, setSearchTerm] = useState("The Shawshank Redemption");
  const [showRecommendation, setShowRecommendation] = useState(false);

  // PARTIAL MATCH, sorted by earliest indexOf
  const matchingMovies = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return [];

    const results = movieList.filter((movie) =>
      movie.name.toLowerCase().includes(term)
    );

    results.sort((a, b) => a.name.toLowerCase().indexOf(term) - b.name.toLowerCase().indexOf(term));
    return results;
  }, [searchTerm, movieList]);

  // The first match is the selected movie
  const selectedMovie = matchingMovies.length > 0 ? matchingMovies[0] : null;

  // Recommendation logic (picks a random one from the best 10)
  const recommendation = useMemo(() => {
    if (!selectedMovie) return null;

    const candidates = movieList
      .filter((m) => m.name !== selectedMovie.name)
      .filter((m) => parseFloat(m.score) >= 7.5 && parseInt(m.votes.replace(",", "")) > 500000)
      .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
      .slice(0, 10); // Take only the top 10

    // Pick a random one from the top 10
    return candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : null;
  }, [selectedMovie, movieList]);

  return (
    <div className="text-white">
      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowRecommendation(false); // Reset on new search
          }}
          placeholder="Search a movie (e.g. The Shining)"
          className="form-control"
          style={{ maxWidth: "300px", border: "1px solid #E50914" }}
        />
        <button className="btn btn-danger ms-2" onClick={() => setSearchTerm(searchTerm)}>
          Search
        </button>
      </div>

      {/* If no movie found */}
      {!selectedMovie ? (
        <p className="text-muted fst-italic text-center">No movie found.</p>
      ) : (
        <>
          {/* Movie Card */}
          <div className="card bg-dark text-white mb-4 shadow-lg">
            <div className="card-header text-white bg-danger">{selectedMovie.name}</div>
            <div className="card-body">
              <p><strong>Year:</strong> {selectedMovie.year}</p>
              <p><strong>Director:</strong> {selectedMovie.director}</p>
              <p><strong>Star:</strong> {selectedMovie.star}</p>
              <p><strong>Rating:</strong> {selectedMovie.score}</p>
              <p><strong>Votes:</strong> {selectedMovie.votes}</p>
              <p><strong>Budget:</strong> ${selectedMovie.budget}</p>
              <p><strong>Gross:</strong> ${selectedMovie.gross}</p>
            </div>
          </div>

          {/* Recommend Me Button */}
          <div className="text-center mb-3">
            <button className="btn btn-danger" onClick={() => setShowRecommendation(true)}>
              Recommend Me
            </button>
          </div>

          {/* Show the recommendation if the user clicks the button */}
          {showRecommendation && (
            <div className="text-center">
              {recommendation ? (
                <p style={{ fontSize: "1.2rem", fontWeight: "500", marginBottom: "2rem" }}>
                  <span style={{ fontWeight: "bold" }}>You should watch:</span> {recommendation.name}
                </p>
              ) : (
                <p className="fst-italic text-muted" style={{ marginBottom: "2rem" }}>
                  No recommended movie found.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MovieSearchDetails;
