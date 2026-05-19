@echo off
REM ========================================================
#  UrbanSim AI — One-Command Service Launcher (Windows)
REM ========================================================

echo.
echo  =======================================================
echo   UrbanSim AI — Initializing and Starting Services
echo  =======================================================
echo.

REM --- Check virtual environment ---
if not exist "backend\.venv\Scripts\activate.bat" (
    echo [INFO] Virtual environment not found in backend\.venv\
    echo        Creating virtual environment...
    python -m venv backend\.venv
)

REM --- Install/Verify Backend dependencies ---
echo [1/4] Installing/Verifying Backend Python dependencies...
call backend\.venv\Scripts\activate.bat
pip install -r backend\requirements.txt
echo       Done.
echo.

REM --- Initialize database (idempotent seeder) ---
echo [2/4] Initializing Database with mock tables and seeding...
cd backend
python init_db_simple.py
cd ..
echo       Done.
echo.

REM --- Start Backend (FastAPI) ---
echo [3/4] Starting Asynchronous Backend API on http://localhost:8000 ...
start "UrbanSim-Backend-API" cmd /k "cd backend && .venv\Scripts\activate.bat && uvicorn main:app --reload --port 8000"

REM --- Start Web App & Mobile Metro Bundler ---
echo [4/4] Starting Frontends...
echo       - React Web Dashboard running at http://localhost:5173
echo       - Expo Mobile Metro Bundler running at http://localhost:8081
echo.

REM Start Web Frontend
start "UrbanSim-Web-Dashboard" cmd /k "cd frontend-web && npm install && npm run dev"

REM Start Mobile Frontend (Expo)
start "UrbanSim-Mobile-App" cmd /k "cd frontend-mobile && npm install --legacy-peer-deps && npx expo start --web"

echo  =======================================================
echo   All services have been launched in separate terminals!
echo.
echo   - Backend API Docs:   http://localhost:8000/docs
echo   - Web Dashboard:      http://localhost:5173
echo   - Mobile App (Web):   http://localhost:8081
echo  =======================================================
echo.
pause
