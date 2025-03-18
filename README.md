# 🎬 CineViz - Data Visualization & Smart Recommendations

🚀 **CineViz** is an **interactive visualization platform** built with **React.js & Plotly.js**, offering **detailed analytics on Anime, Movies, and TV Series**. It provides **interactive charts, search functionalities, and AI-powered recommendations** to help users **discover and analyze content.**

🔗 **Live Demo:** (https://karanjotsingh-max.github.io/CineViz)  
🔗 **GitHub Repository:** (https://github.com/karanjotsingh-max/CineViz)

---

## **🌟 Key Features**

### **📊 1️⃣ Interactive Data Visualizations (Core Feature)**
CineViz provides **rich data-driven insights** through interactive charts.

#### **🔹 Anime Charts**
- **Anime Genre Popularity Chart**  
  Visualizes the most **popular anime genres** based on members & ratings.
- **Top Anime Chart**  
  Displays the most popular anime sorted by ratings & member count.
- **Top Manga Chart**  
  Highlights the most popular manga by genre and user votes.

#### **🔹 TV Series Charts**
- **TV Genre Trend Chart**  
  Shows the evolution of TV genres over the decades.

#### **🔹 Movie Charts**
- **Genre Chart**  
  Visualizes genre distribution for movies.
- **Budget vs Gross Revenue Chart**  
  Compares movie budgets vs. earnings, identifying blockbusters & flops.
- **World Map Visualization**  
  Displays geographical movie production trends.

---

## **📊 2️⃣ Data Preprocessing Pipeline**
We preprocessed raw CSV datasets using Python scripts to clean, filter, and convert data into JSON format for efficient frontend usage.

### **🛠️ Preprocessing Steps**
1. Raw data (Anime, Movies, TV Series) was stored in CSV format.
2. Python scripts were used to clean and filter data, ensuring:
   - Removal of missing or irrelevant fields.
   - Standardization of genre formats.
   - Conversion of numerical values (e.g., votes, budget).
3. Final datasets were converted to JSON for optimized frontend rendering.

### **🗂️ Preprocessing Scripts**
Located in the `/utils/` folder:
- `process_anime.py` → Converts `anime.csv` → `anime_data.json`
- `process_movies.py` → Converts `movies.csv` → `movies_data.json`
- `process_series.py` → Converts `series.csv` → `series_data.json`
- `process_manga.py` → Converts `manga.csv` → `manga_data.json`

---

## **📖 Setup & Installation**

### 🔹 Step 1: Clone the Repository
```bash
git clone https://github.com/karanjotsingh-max/CineViz
cd CineViz
```
### 🔹 Step 2: Install Dependencies
```bash
npm install
```
### 🔹 Step 3: Start the Development Server
```bash
npm start
```
