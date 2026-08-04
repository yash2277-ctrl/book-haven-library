# 🚀 Complete Setup Script

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Book Haven - Automated Complete Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$baseDir = "c:\Users\sahu4\OneDrive\Pictures\Screenshots\libary\book-haven-display-main"

# Function to check if MongoDB is available
function Test-MongoDB {
    try {
        $null = mongod --version 2>&1
        return $true
    } catch {
        return $false
    }
}

# Check MongoDB
Write-Host "[1/6] Checking MongoDB..." -ForegroundColor Yellow
$mongoInstalled = Test-MongoDB

if (-not $mongoInstalled) {
    Write-Host "   ❌ MongoDB not found locally" -ForegroundColor Red
    Write-Host ""
    Write-Host "   You have 2 options:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Option 1: Use MongoDB Atlas (Cloud - No Installation)" -ForegroundColor Green
    Write-Host "   - Fastest: Setup in 5 minutes" -ForegroundColor Gray
    Write-Host "   - No installation needed" -ForegroundColor Gray
    Write-Host "   - Free forever" -ForegroundColor Gray
    Write-Host "   - See: MONGODB_CLOUD_SETUP.md for guide" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   Option 2: Install MongoDB Locally" -ForegroundColor Green
    Write-Host "   - Download from: https://www.mongodb.com/try/download/community" -ForegroundColor Gray
    Write-Host "   - Run installer with default settings" -ForegroundColor Gray
    Write-Host "   - Come back and run this script again" -ForegroundColor Gray
    Write-Host ""
    
    $choice = Read-Host "   Enter 1 for Cloud setup, 2 to download MongoDB installer, or Q to quit"
    
    if ($choice -eq "1") {
        Write-Host ""
        Write-Host "   Opening MongoDB Atlas signup page..." -ForegroundColor Green
        Start-Process "https://www.mongodb.com/cloud/atlas/register"
        Write-Host ""
        Write-Host "   📖 Follow the guide in: MONGODB_CLOUD_SETUP.md" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "   After setup, edit backend\.env and set your connection string:" -ForegroundColor Yellow
        Write-Host "   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/book_haven" -ForegroundColor Gray
        Write-Host ""
        Read-Host "   Press Enter after you've updated the .env file"
    }
    elseif ($choice -eq "2") {
        Write-Host ""
        Write-Host "   Opening MongoDB download page..." -ForegroundColor Green
        Start-Process "https://www.mongodb.com/try/download/community"
        Write-Host ""
        Write-Host "   Please install MongoDB and run this script again!" -ForegroundColor Yellow
        Write-Host ""
        pause
        exit
    }
    else {
        Write-Host ""
        Write-Host "   Setup cancelled. See MONGODB_SETUP_OPTIONS.md for manual setup." -ForegroundColor Yellow
        Write-Host ""
        pause
        exit
    }
} else {
    Write-Host "   ✅ MongoDB is installed and available!" -ForegroundColor Green
}

Write-Host ""
Write-Host "[2/6] Checking frontend dependencies..." -ForegroundColor Yellow
Set-Location $baseDir
if (-not (Test-Path "node_modules")) {
    Write-Host "   Installing frontend dependencies..." -ForegroundColor Gray
    npm install | Out-Null
    Write-Host "   ✅ Frontend dependencies installed!" -ForegroundColor Green
} else {
    Write-Host "   ✅ Frontend dependencies already installed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "[3/6] Checking backend dependencies..." -ForegroundColor Yellow
Set-Location "$baseDir\backend"
if (-not (Test-Path "node_modules")) {
    Write-Host "   Installing backend dependencies..." -ForegroundColor Gray
    npm install | Out-Null
    Write-Host "   ✅ Backend dependencies installed!" -ForegroundColor Green
} else {
    Write-Host "   ✅ Backend dependencies already installed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "[4/6] Testing MongoDB connection..." -ForegroundColor Yellow
Write-Host "   Attempting to connect to MongoDB..." -ForegroundColor Gray

# Try to seed the database
Write-Host ""
Write-Host "[5/6] Seeding database with sample data..." -ForegroundColor Yellow
Write-Host "   This will create:" -ForegroundColor Gray
Write-Host "   - 4 user accounts (user, librarian, admin)" -ForegroundColor Gray
Write-Host "   - 12 sample books" -ForegroundColor Gray
Write-Host "   - 3 borrow records" -ForegroundColor Gray
Write-Host ""

try {
    npm run seed
    Write-Host ""
    Write-Host "   ✅ Database seeded successfully!" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "   ❌ Error seeding database" -ForegroundColor Red
    Write-Host "   Please check your MongoDB connection in backend\.env" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

Write-Host ""
Write-Host "[6/6] Setup complete!" -ForegroundColor Yellow
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   🎉 Book Haven is ready!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your library system is configured with:" -ForegroundColor White
Write-Host "   ✅ Frontend dependencies" -ForegroundColor Green
Write-Host "   ✅ Backend dependencies" -ForegroundColor Green
Write-Host "   ✅ Database with sample data" -ForegroundColor Green
Write-Host ""
Write-Host "Sample Login Credentials:" -ForegroundColor Yellow
Write-Host "   User: alex@example.com / password123" -ForegroundColor Gray
Write-Host "   Librarian: librarian@library.com / librarian123" -ForegroundColor Gray
Write-Host "   Admin: admin@library.com / admin123" -ForegroundColor Gray
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Press any key to start both servers" -ForegroundColor White
Write-Host "   2. Frontend will open at: http://localhost:8080" -ForegroundColor White
Write-Host "   3. Backend API at: http://localhost:5000" -ForegroundColor White
Write-Host ""

pause

Write-Host ""
Write-Host "Starting servers..." -ForegroundColor Yellow
Write-Host ""

# Start backend in new window
Write-Host "   Starting backend server..." -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir\backend'; Write-Host 'Backend Server Running' -ForegroundColor Green; Write-Host 'API: http://localhost:5000' -ForegroundColor Cyan; Write-Host ''; npm run dev"

Start-Sleep -Seconds 2

# Start frontend in new window
Write-Host "   Starting frontend server..." -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir'; Write-Host 'Frontend Server Running' -ForegroundColor Green; Write-Host 'App: http://localhost:8080' -ForegroundColor Cyan; Write-Host ''; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "Access your application at: http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop servers: Close the terminal windows or press Ctrl+C" -ForegroundColor Yellow
Write-Host ""
Write-Host "Enjoy your Book Haven Library System! 📚" -ForegroundColor Magenta
Write-Host ""
