import pandas as pd
import json
import os
import ast

# Define paths inside the `src/data` folder
script_dir = os.path.dirname(__file__)  # Get the script directory
file_path = os.path.join(script_dir, "../data/manga.csv")  # Input file path
output_path = os.path.join(script_dir, "../data/manga_data.json")  # Output file path

# Check if the file exists
if not os.path.exists(file_path):
    print(f"❌ Error: Input file not found at {file_path}")
    exit(1)

# Read the CSV file
df = pd.read_csv(file_path, dtype={"manga_id": str}, low_memory=False)

# Columns to keep
columns_to_keep = ["manga_id", "title", "score", "members", "favorites", "genres"]

# Check if "theme" column exists, then add it
if "theme" in df.columns:
    columns_to_keep.append("theme")

# Keep only the necessary columns
df = df[columns_to_keep]

# Replace NaN values in `score` with a default value (e.g., 0.0)
df["score"] = pd.to_numeric(df["score"], errors="coerce").fillna(0.0)

# Replace NaN values in other columns with `None` for JSON compatibility
df.fillna(pd.NA, inplace=True)

# Convert all pandas NA values to None for JSON compatibility
df = df.map(lambda x: None if pd.isna(x) else x)

# Convert genres and themes from string representation of lists to actual lists
for col in ["genres", "theme"]:
    if col in df.columns:
        df[col] = df[col].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) and x.startswith("[") else [])

# Convert dataframe to list of dictionaries
manga_list = df.to_dict(orient="records")

# Save the cleaned data as JSON in the correct directory
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(manga_list, f, indent=4, ensure_ascii=False)

print(f"✅ Preprocessed manga data saved to {output_path}")
