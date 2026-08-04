@echo off
cls
echo.
echo ========================================
echo    Book Haven - Start Backend Server
echo ========================================
echo.
echo Frontend is already running at:
echo    http://localhost:8080
echo.
echo ========================================
echo.
echo To start the backend, you need MongoDB connection.
echo.
echo OPTION 1: MongoDB Atlas (Cloud - RECOMMENDED)
echo ----------------------------------------
echo 1. Sign up at: https://www.mongodb.com/cloud/atlas/register
echo 2. Create free cluster (M0)
echo 3. Get connection string
echo 4. Update backend\.env file:
echo    MONGODB_URI=your_connection_string_here
echo.
echo OPTION 2: Local MongoDB
echo ----------------------------------------
echo 1. Install from: https://www.mongodb.com/try/download/community
echo 2. Run installer with defaults
echo.
echo ========================================
echo.
set /p "choice=Have you set up MongoDB? (y/n): "

if /i "%choice%"=="y" (
    echo.
    echo Starting backend server...
    echo.
    cd backend
    
    echo Seeding database with sample data...
    call npm run seed
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo Database seeded successfully!
        echo.
        echo Starting backend server...
        echo Backend will run at: http://localhost:5000
        echo.
        call npm run dev
    ) else (
        echo.
        echo Error: Could not connect to MongoDB!
        echo.
        echo Please check:
        echo 1. MongoDB is running (local) OR
        echo 2. MONGODB_URI in backend\.env is correct (Atlas)
        echo.
        pause
    )
) else (
    echo.
    echo Please set up MongoDB first!
    echo.
    echo Quick Setup:
    echo 1. Open: https://www.mongodb.com/cloud/atlas/register
    echo 2. Follow MONGODB_CLOUD_SETUP.md for detailed steps
    echo 3. Update backend\.env with your connection string
    echo 4. Run this script again
    echo.
    pause
)
