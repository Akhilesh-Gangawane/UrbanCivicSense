# 🏗️ UrbanSim AI — Smart Urban Issue Redressal Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688.svg?style=flat&logo=FastAPI&logoColor=white)](https://fastapi.tiangolo.com/)
[![React Native](https://img.shields.io/badge/React_Native-Expo-61DAFB.svg?style=flat&logo=React&logoColor=black)](https://reactnative.dev/)
[![Vite](https://img.shields.io/badge/Vite-Vite_React-646CFF.svg?style=flat&logo=Vite&logoColor=white)](https://vitejs.dev/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-CNN-FF6F00.svg?style=flat&logo=TensorFlow&logoColor=white)](https://www.tensorflow.org/)

**UrbanSim AI** is a comprehensive, production-ready, AI-driven civic issue management and redressal system. The platform bridges the gap between citizens and local government by using Computer Vision (CNN) and Natural Language Processing (NLP) models to automatically classify, prioritize, and route reported issues (like road damage, water leaks, sanitation, or faulty streetlights) directly to the corresponding municipal departments.

This repository integrates three distinct components:
1. **FastAPI Backend**: A robust asynchronous Python API server with built-in ML prediction engines.
2. **React Native Mobile App**: A cross-platform citizen app (via Expo Router) for capture, GPS tagging, and real-time issue reporting.
3. **Vite React Web Dashboard**: An interactive administrative portal featuring beautiful data analytics, live weather integrations, and issue map visualizations.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Backend API** | FastAPI (Python 3.13) · SQLAlchemy (Async ORM) · SQLite/PostgreSQL |
| **Mobile App** | React Native · Expo Router · Tailwind CSS (NativeWind) · TypeScript |
| **Web Dashboard** | React · Vite · Chart.js · Leaflet Maps · Tailwind CSS · Framer Motion |
| **AI/ML Core** | TensorFlow (CNN Image Model) · Scikit-Learn (TF-IDF NLP Classifier) |
| **Auth & Security** | JWT (JSON Web Tokens) · Passlib (bcrypt password hashing) |

---

## 📂 Unified Repository Structure

```text
UrbanSimAI/
├── backend/                    # FastAPI Application
│   ├── app/                    # Models, schemas, JWT auth, and async database config
│   ├── civic_eye_model.h5      # Trained TensorFlow CNN image model weights
│   ├── text_classifier.pkl     # Trained Scikit-Learn text classifier
│   ├── tfidf_vectorizer.pkl    # TF-IDF Vectorizer for text processing
│   ├── main.py                 # Core API endpoints & backend router logic
│   ├── init_db_simple.py       # Seed script to auto-generate mock issues & users
│   ├── image_predict.py        # TensorFlow image classification helper
│   ├── predict_text.py         # NLP text classification helper
│   └── requirements.txt        # Backend dependencies
├── frontend-mobile/            # Cross-Platform React Native (Expo) Mobile App
│   ├── app/                    # File-based router screens (Expo Router)
│   ├── src/                    # Components, state context, and hooks
│   └── package.json            # Node.js dependencies & scripts
├── frontend-web/               # Vite React Web Dashboard (Admin & Citizen)
│   ├── src/                    # App routing, pages, hooks, charts, and API integrations
│   ├── vite.config.js          # Vite React compiler configuration
│   └── package.json            # Web-app Node.js dependencies
├── experimental/               # Exploratory Research & Prototyping
│   └── pothole-detection/      # Pothole detection using Roboflow API
│       ├── detection.py        # OpenCV + Tkinter image prediction test script
│       └── requirements.txt    # Roboflow and pillow dependencies
├── docs/                       # Design assets and system specifications
│   └── mockups/                # Static Figma-Stitch exported screen structures
├── start.bat                   # Unified one-command startup for Windows
├── start.sh                    # Unified one-command startup for macOS/Linux
├── .gitignore                  # Unified repository-wide Git exclude patterns
├── LICENSE                     # MIT License
└── README.md                   # You are here!
```

---

## ✨ Features

### 🔹 For Citizens (Mobile & Web)
*   **AI Auto-Routing**: Simply write a short description or snap a photo. The system automatically categorizes the issue and routes it to the correct department (Sanitation, Road, Electricity, Water, or Public Works).
*   **GPS Geo-Tagging**: Accurate location capturing for precise site pinning on municipal maps.
*   **Live Status Tracking**: View detailed timelines of reported issues (Pending $\rightarrow$ Assigned $\rightarrow$ In Progress $\rightarrow$ Resolved).
*   **Real-time Analytics**: Citizens can view recent issues reported in their neighborhood.

### 🔹 For Admins & Officials (Web Dashboard)
*   **Interactive City Map View**: Real-time Leaflet map pinning issue hotspots, classified by severity and status.
*   **Department Analytics**: Beautiful bar and line charts representing resolution rates, open ticket counts, and bottleneck alerts.
*   **AI Insights**: Interface to test raw descriptions and evaluate model confidence values.
*   **Bulk Management Actions**: Quick tools to update tickets, assign municipal workers, and send updates to reporters.
*   **Weather Alerts**: Local weather API integrations to alert field workers of adverse conditions.

---

## 🚀 Quick Start (Installation & Execution)

### Prerequisites
*   **Python**: Version `3.10` to `3.13` (`3.13` recommended)
*   **Node.js**: Version `18` or higher
*   **npm**: Version `9` or higher

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/UrbanSimAI.git
cd UrbanSimAI
```

### Step 2: Set Up the Backend
1.  Navigate to the backend directory and create a virtual environment:
    ```bash
    cd backend
    python -m venv .venv
    ```
2.  Activate the virtual environment:
    *   **Windows (PowerShell)**: `.\.venv\Scripts\Activate.ps1`
    *   **Windows (CMD)**: `.\.venv\Scripts\activate.bat`
    *   **macOS / Linux**: `source .venv/bin/activate`
3.  Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Initialize and seed the SQLite database:
    ```bash
    python init_db_simple.py
    ```
    This generates a local database file `urban_db.sqlite3` packed with simulated accounts, departments, and realistic issue logs.
5.  Launch the backend API server:
    ```bash
    python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The Swagger interactive API documentation will be available at **[http://localhost:8000/docs](http://localhost:8000/docs)**.

---

### Step 3: Run the Web Dashboard (`frontend-web`)
1.  Open a new terminal and navigate to the web directory:
    ```bash
    cd frontend-web
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Launch the web server in development mode:
    ```bash
    npm run dev
    ```
    The Web Dashboard will load at **[http://localhost:5173](http://localhost:5173)**.

---

### Step 4: Run the Mobile App (`frontend-mobile`)
1.  Open a third terminal and navigate to the mobile app directory:
    ```bash
    cd frontend-mobile
    ```
2.  Install dependencies (force peer dependencies for Expo core plugins if needed):
    ```bash
    npm install --legacy-peer-deps
    ```
3.  Launch the Metro bundler:
    ```bash
    npx expo start --web
    ```
    You can test it in your web browser at **[http://localhost:8081](http://localhost:8081)**, or download **Expo Go** on your smartphone and scan the QR code in the terminal to run it as a native app!

---

## ⚡ Unified One-Command Start (Recommended)

To run the Backend and the Mobile Frontend together instantly, you can use our built-in startup scripts from the root directory:

*   **Windows**:
    ```cmd
    start.bat
    ```
*   **macOS / Linux**:
    ```bash
    chmod +x start.sh
    ./start.sh
    ```

---

## 🔐 Mock Test Credentials

Mock Authentication is integrated for seamless evaluation. Use these pre-configured user profiles:

| Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Admin Official** | `admin@example.com` | `admin123` | Analytics dashboard, issue routing, interactive maps |
| **Citizen Reporter** | `user@example.com` | `user123` | Ticket creation, personal dashboard, real-time tracking |

---

## 🤝 Contributors

Special thanks to the creative and development minds behind the core modules of this system:
*   **Atharv Mulik** (AI, Fast API)
*   **Siddhi Naik** (Flutter & Expo Frontend Prototyping)
*   **Vaishnavi Nile** (Database & Analytics Integrations)
*   **Tejas More** (DevOps & Render Cloud Deployments)

---

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.
