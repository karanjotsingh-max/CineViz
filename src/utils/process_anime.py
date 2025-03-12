import pandas as pd
import json
import os

# Define paths
csv_path = os.path.join(os.path.dirname(__file__), "../data/anime.csv")  # Adjust if needed
json_path = os.path.join(os.path.dirname(__file__), "../data/anime_data.json")

# Load the CSV file
df = pd.read_csv(csv_path)

# Handling multiple genres (split by comma)
df['genre'] = df['genre'].fillna("").apply(lambda x: x.split(', ') if isinstance(x, str) else [])

# Replace NaN in 'rating' column with 0.0
df['rating'] = df['rating'].apply(lambda x: 0.0 if pd.isna(x) else float(x))

# Replace NaN in 'type' column with "Unknown"
df['type'] = df['type'].fillna("Unknown")

# Convert DataFrame to a list of dictionaries (JSON format)
anime_list = df.to_dict(orient="records")

# Save to JSON
with open(json_path, "w", encoding="utf-8") as json_file:
    json.dump(anime_list, json_file, indent=4, ensure_ascii=False)

print(f"✅ Anime data successfully saved to {json_path}")
