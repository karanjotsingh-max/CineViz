import csv
import json
import os

COUNTRY_MAPPINGS = {
    # United States variants
    "USA": "United States",
    "U.S.A.": "United States",
    "US": "United States",
    "U.S.": "United States",
    "America": "United States",
    "United States of America": "United States",

    # United Kingdom variants
    "UK": "United Kingdom",
    "U.K.": "United Kingdom",
    "England": "United Kingdom",
    "Scotland": "United Kingdom",
    "Wales": "United Kingdom",
    "Britain": "United Kingdom",
    "Great Britain": "United Kingdom",

    # United Arab Emirates
    "UAE": "United Arab Emirates",
    "U.A.E.": "United Arab Emirates",

    # Korea
    "Korea": "South Korea",
    "S. Korea": "South Korea",
    "South Korea": "South Korea",
    "Republic of Korea": "South Korea",

    # China
    "PRC": "China",
    "P.R.C.": "China",
    "Mainland China": "China",

    # Russia
    "Russian Federation": "Russia",
    "USSR": "Russia",

    # Ireland
    "N. Ireland": "United Kingdom",
    "Republic of Ireland": "Ireland",

    # More variations
    "Czechia": "Czech Republic",
    "Ivory Coast": "Côte d’Ivoire",
    "Bolivia (Plurinational State)": "Bolivia",
    "Viet Nam": "Vietnam",
    "Republic of Viet Nam": "Vietnam",
    "Vatican": "Vatican City",
    "Palestine": "Palestinian Territories",
    "Syria": "Syrian Arab Republic",
    "Macedonia": "North Macedonia",
    "Republic of Macedonia": "North Macedonia",
    # etc...
}

# Adjust these paths based on your actual folder structure:
# If your CSV is in /public/data, and your script is in /src/utils:
csv_file_path = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'data', 'movies.csv')
json_file_path = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'data', 'movies_data.json')

def csv_to_json():
    data_list = []

    with open(csv_file_path, mode='r', encoding='utf-8-sig') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        for row in csv_reader:
            # 1) Create a "cleaned_row" where:
            #    - We remove trailing commas from keys  (e.g. "runtime,," -> "runtime")
            #    - We remove trailing commas from values (e.g. "146.0," -> "146.0")
            cleaned_row = {}
            for key, value in row.items():
                if not key:
                    continue  # skip empty keys if any

                # Remove trailing commas/spaces from the key
                new_key = key.strip().rstrip(',')

                # Remove trailing commas/spaces from the value (if it exists)
                new_value = value.strip() if value else value
                if new_value:
                    new_value = new_value.rstrip(',')

                cleaned_row[new_key] = new_value

            # 2) Standardize the "country" field -> "plotly_country"
            original_country = cleaned_row.get('country', '').strip()
            standardized_country = COUNTRY_MAPPINGS.get(
                original_country,
                original_country  # fallback if not found
            )
            cleaned_row['plotly_country'] = standardized_country

            data_list.append(cleaned_row)

    # 3) Write the cleaned data to JSON
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(data_list, json_file, indent=4)

if __name__ == '__main__':
    csv_to_json()
    print(f"Converted {csv_file_path} -> {json_file_path} with standardized country names and cleaned-up runtime fields.")
