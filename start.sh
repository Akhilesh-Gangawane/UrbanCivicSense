#!/usr/bin/env bash
# ========================================================
#  UrbanSim AI — One-Command Service Launcher (macOS/Linux)
# ========================================================

set -e

echo ""
echo " ======================================================="
echo "  UrbanSim AI — Initializing and Starting Services"
echo " ======================================================="
echo ""

# --- Setup virtual environment ---
if [ ! -d "backend/.venv" ]; then
    echo "[INFO] Virtual environment not found in backend/.venv/"
    echo "       Creating virtual environment..."
    python3 -m venv backend/.venv
fi

# --- Activate venv & Install dependencies ---
echo "[1/4] Installing/Verifying Backend dependencies..."
source backend/.venv/bin/activate
pip install -r backend/requirements.txt
echo "      Done."
echo ""

# --- Initialize database ---
echo "[2/4] Initializing Database with mock tables and seeding..."
cd backend
python3 init_db_simple.py
cd ..
echo "      Done."
echo ""

# --- Start Backend (background) ---
echo "[3/4] Starting Asynchronous Backend API on http://localhost:8000 ..."
cd backend
source .venv/bin/activate
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# --- Start Frontends ---
echo "[4/4] Starting Frontends..."
echo "      - React Web Dashboard running at http://localhost:5173"
echo "      - Expo Mobile Metro Bundler running at http://localhost:8081"
echo ""

# Start Web Frontend (Vite)
cd frontend-web
npm install
npm run dev &
WEB_PID=$!
cd ..

# Start Mobile Frontend (Expo)
cd frontend-mobile
npm install --legacy-peer-deps
npx expo start --web &
MOBILE_PID=$!
cd ..

echo ""
echo " ======================================================="
echo "  All services successfully launched!"
echo "  - Backend API Docs:   http://localhost:8000/docs"
echo "  - Web Dashboard:      http://localhost:5173"
echo "  - Mobile App (Web):   http://localhost:8081"
echo " ======================================================="
echo ""
echo "  Press Ctrl+C to terminate all servers."
echo ""

# Trap SIGINT and SIGTERM to kill all spawned child processes
cleanup() {
    echo ""
    echo "Stopping all services..."
    kill $BACKEND_PID $WEB_PID $MOBILE_PID 2>/dev/null || true
    echo "Done."
    exit 0
}

trap cleanup SIGINT SIGTERM

# Keep the script active to manage processes
wait
