// src/components/MovieSearchDetails.js
import React, { useState, useMemo } from "react";

function MovieSearchDetails({ movieList }) {
  const [searchTerm, setSearchTerm] = useState("The Shining");
  const [showRecommendation, setShowRecommendation] = useState(false);

  // PARTIAL SEARCH
  const matchingMovies = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return [];

    const results = movieList.filter((movie) =>
      movie.name.toLowerCase().includes(term)
    );

    results.sort((a, b) => a.name.toLowerCase().indexOf(term) - b.name.toLowerCase().indexOf(term));
    return results;
  }, [searchTerm, movieList]);

  // Selected Movie
  const selectedMovie = matchingMovies.length > 0 ? matchingMovies[0] : null;

  // Recommendation Logic
  const recommendation = useMemo(() => {
    if (!selectedMovie) return null;

    const candidates = movieList
      .filter((m) => m.name !== selectedMovie.name)
      .filter((m) => parseFloat(m.score) >= 8.0 && parseInt(m.votes.replace(",", "")) > 500000)
      .sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    return candidates.length > 0 ? candidates[0] : null;
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
            setShowRecommendation(false);
          }}
          placeholder="Search a movie (e.g. The Shining)"
          className="form-control"
          style={{ maxWidth: "300px", border: "1px solid #E50914" }}
        />
        <button className="btn btn-danger ms-2" onClick={() => setSearchTerm(searchTerm)}>
          Search
        </button>
      </div>

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

          {showRecommendation && recommendation && (
            <p className="text-center" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              You should watch: {recommendation.name}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default MovieSearchDetails;
