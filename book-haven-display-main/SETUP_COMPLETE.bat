@echo off
echo.
echo ================================================
echo   Book Haven - Automated Setup and Start
echo ================================================
echo.

cd /d "%~dp0"

echo [1/4] Checking frontend...
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed!
)

echo.
echo [2/4] Checking backend...
cd backend
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed!
)

echo.
echo [3/4] Checking MongoDB connection...
echo Please ensure MongoDB is running (local or Atlas)
echo.
pause

echo.
echo [4/4] Seeding database...
call npm run seed

echo.
echo ================================================
echo   Setup Complete!
echo ================================================
echo.
echo Starting servers...
echo.
echo Frontend will open at: http://localhost:8080
echo Backend will run at: http://localhost:5000
echo.
echo Press Ctrl+C to stop the servers
echo.
pause

echo Starting backend server...
start cmd /k "cd /d %~dp0\backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting frontend server...
cd ..
call npm run dev
