// src/components/AnimeSearchDetails.js
import React, { useState, useMemo } from "react";

function AnimeSearchDetails({ animeList }) {
  const [searchTerm, setSearchTerm] = useState("Naruto");
  // Whether to show the recommendation
  const [showRecommendation, setShowRecommendation] = useState(false);

  // PARTIAL MATCH, sorted by earliest indexOf
  const matchingAnime = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return [];

    const results = animeList.filter((item) =>
      item.name.toLowerCase().includes(term)
    );

    // Sort by indexOf(term), then alphabetical
    results.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const idxA = aName.indexOf(term);
      const idxB = bName.indexOf(term);
      if (idxA !== idxB) return idxA - idxB;
      return aName.localeCompare(bName);
    });

    return results;
  }, [searchTerm, animeList]);

  // The first match is the selected anime
  const selectedAnime = matchingAnime.length > 0 ? matchingAnime[0] : null;

  // Recommendation logic (calculated only if showRecommendation is true)
  const recommendation = useMemo(() => {
    if (!selectedAnime) return null;
    const mainGenres = selectedAnime.genre || [];

    const candidates = animeList
      .filter((a) => a.anime_id !== selectedAnime.anime_id)
      .filter((a) => {
        const overlap = a.genre?.filter((g) => mainGenres.includes(g)) || [];
        return overlap.length > 0;
      })
      .filter((a) => a.rating > 8.0 && a.members > 500000)
      .sort((a, b) => {
        const overlapA = a.genre.filter((g) => mainGenres.includes(g)).length;
        const overlapB = b.genre.filter((g) => mainGenres.includes(g)).length;
        if (overlapB !== overlapA) return overlapB - overlapA;
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.members - a.members;
      });

    return candidates.length > 0 ? candidates[0] : null;
  }, [selectedAnime, animeList]);

  return (
    <div className="text-white">
      {/* Heading */}
      <div className="text-center mb-3">
        <h4 style={{ display: "inline-block", marginRight: "8px" }}>
          <span role="img" aria-label="search">
            🔎
          </span>{" "}
          Search Anime
        </h4>
      </div>

      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowRecommendation(false); // Reset on new search
          }}
          placeholder='Type partial name (e.g. "Naru")'
          className="form-control"
          style={{ maxWidth: "300px", border: "1px solid #E50914" }}
        />
        <button
          className="btn btn-danger ms-2"
          style={{ backgroundColor: "#E50914", border: "none" }}
          onClick={() => setSearchTerm(searchTerm)}
        >
          Search
        </button>
      </div>

      {/* If nothing found */}
      {!selectedAnime ? (
        <p className="fst-italic text-center text-muted">
          No anime found matching "{searchTerm}".
        </p>
      ) : (
        <>
          {/* Main Anime Card */}
          <div
            className="card mb-4 shadow-lg"
            style={{
              backgroundColor: "#2b2b2b",
              borderRadius: "8px",
              border: "1px solid #444",
            }}
          >
            {/* Card Header (red, white text) */}
            <div
              className="card-header text-white"
              style={{
                backgroundColor: "#E50914",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            >
              <h5 className="card-title mb-0">{selectedAnime.name}</h5>
            </div>

            {/* Card Body (dark background, white text) */}
            <div
              className="card-body text-white"
              style={{ backgroundColor: "#2b2b2b" }}
            >
              <p className="mb-2">
                <strong>Type:</strong> {selectedAnime.type}
              </p>
              <p className="mb-2">
                <strong>Episodes:</strong> {selectedAnime.episodes}
              </p>
              <p className="mb-2">
                <strong>Rating:</strong> {selectedAnime.rating}
              </p>
              <p className="mb-2">
                <strong>Members:</strong>{" "}
                {Number(selectedAnime.members).toLocaleString()}
              </p>
              <p className="mb-0">
                <strong>Genres:</strong>{" "}
                {selectedAnime.genre?.length
                  ? selectedAnime.genre.join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Button to trigger the recommendation */}
          <div className="text-center mb-3">
            <button
              className="btn btn-danger"
              style={{ 
                fontWeight: "bold", 
                backgroundColor: "#E50914", 
                border: "none" 
              }}
              onClick={() => setShowRecommendation(true)}
            >
              Recommend Me
            </button>
          </div>

          {/* Only show the recommendation if user clicked the button */}
          {showRecommendation && (
            <div className="text-center">
              {recommendation ? (
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    marginBottom: "2rem",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>You should watch:</span>{" "}
                  {recommendation.name}
                </p>
              ) : (
                <p
                  className="fst-italic text-muted"
                  style={{ marginBottom: "2rem" }}
                >
                  No recommended anime found.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AnimeSearchDetails;
