import pandas as pd
import json
import os
import ast

# Define paths
script_dir = os.path.dirname(__file__)  # Get the script directory
file_path = os.path.join(script_dir, "../data/series.csv")  # Input file path
output_path = os.path.join(script_dir, "../data/series_data.json")  # Output file path

# Check if the file exists
if not os.path.exists(file_path):
    print(f"❌ Error: Input file not found at {file_path}")
    exit(1)

# Read the CSV file
df = pd.read_csv(file_path, dtype={"releaseYear": str}, low_memory=False)

# Columns to keep and rename
columns_to_keep = {
    "title": "title",
    "type": "type",
    "genres": "genres",
    "releaseYear": "releaseYear",
    "imdbAverageRating": "Rating",
    "imdbNumVotes": "Votes"
}

# Keep only the required columns and rename them
df = df[list(columns_to_keep.keys())].rename(columns=columns_to_keep)

# Filter only TV series
df = df[df["type"].str.lower() == "tv"]

# Handle missing values (replace NaN with None)
df["title"] = df["title"].fillna("Unknown Title")
df["releaseYear"] = df["releaseYear"].fillna("Unknown Year")
df["Rating"] = pd.to_numeric(df["Rating"], errors="coerce").fillna(0.0)  # Replace NaN with 0.0 for Rating
df["Votes"] = pd.to_numeric(df["Votes"], errors="coerce").fillna(0)  # Replace NaN with 0 for Votes

# Fix genre parsing
def parse_genres(value):
    """Convert stringified lists to actual lists or assign 'Unknown' if empty."""
    if isinstance(value, str):
        try:
            parsed = ast.literal_eval(value)  # Safely convert string list to actual list
            return parsed if isinstance(parsed, list) else ["Unknown"]
        except (ValueError, SyntaxError):
            return [value] if value else ["Unknown"]
    return ["Unknown"]

df["genres"] = df["genres"].apply(parse_genres)

# Convert dataframe to list of dictionaries
series_list = df.to_dict(orient="records")

# Save the cleaned data as JSON in the correct directory
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(series_list, f, indent=4, ensure_ascii=False)

print(f"✅ Preprocessed TV Series data saved to {output_path}")
