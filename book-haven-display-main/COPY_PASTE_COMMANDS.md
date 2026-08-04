# 📋 Copy-Paste Commands for Quick Setup

## After MongoDB Atlas Setup

Once you have your MongoDB Atlas connection string, follow these steps:

### 1. Update Backend Configuration

```powershell
# Open the .env file
notepad "c:\Users\sahu4\OneDrive\Pictures\Screenshots\libary\book-haven-display-main\backend\.env"
```

**Change this line:**
```
MONGODB_URI=mongodb://localhost:27017/book_haven
```

**To your Atlas connection string (example):**
```
MONGODB_URI=mongodb+srv://bookhavenuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/book_haven
```

**Important:** Replace `YOUR_PASSWORD` and `cluster0.xxxxx` with your actual values!

---

### 2. Seed the Database

```powershell
cd "c:\Users\sahu4\OneDrive\Pictures\Screenshots\libary\book-haven-display-main\backend"
npm run seed
```

**Expected Output:**
```
🗑️  Data Destroyed...
✅ 4 Users Created
✅ 12 Books Created
✅ 3 Borrow Records Created
✨ Data Imported Successfully!

📝 Sample Login Credentials:
   User: alex@example.com / password123
   Librarian: librarian@library.com / librarian123
   Admin: admin@library.com / admin123
```

---

### 3. Start Backend Server

```powershell
# In the same terminal (backend directory)
npm run dev
```

**Expected Output:**
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
📚 Environment: development
```

**Keep this terminal open!**

---

### 4. Start Frontend Server

**Open a NEW PowerShell window and run:**

```powershell
cd "c:\Users\sahu4\OneDrive\Pictures\Screenshots\libary\book-haven-display-main"
npm run dev
```

**Expected Output:**
```
VITE v5.4.19  ready in XXX ms

➜  Local:   http://localhost:8080/
➜  Network: http://XXX.XXX.XXX.XXX:8080/
```

---

### 5. Open in Browser

```powershell
start http://localhost:8080
```

---

## Quick Test Commands

### Test Backend Health
```powershell
curl http://localhost:5000/api/health
```

### Test Books Endpoint
```powershell
curl http://localhost:5000/api/books
```

### Test Login
```powershell
$body = @{
    email = "alex@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

---

## All-in-One Startup (After Initial Setup)

Save this for future use:

```powershell
# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\sahu4\OneDrive\Pictures\Screenshots\libary\book-haven-display-main\backend'; npm run dev"

# Wait 2 seconds
Start-Sleep -Seconds 2

# Start Frontend
cd "c:\Users\sahu4\OneDrive\Pictures\Screenshots\libary\book-haven-display-main"
npm run dev
```

Or simply double-click: **START_SERVERS.bat**

---

## Stop Servers

Press **Ctrl + C** in each terminal window, or close the windows.

---

## Troubleshooting Commands

### Check if ports are in use
```powershell
# Check port 5000 (backend)
netstat -ano | findstr :5000

# Check port 8080 (frontend)
netstat -ano | findstr :8080
```

### Kill process on port (if needed)
```powershell
# Replace XXXX with Process ID from above
taskkill /PID XXXX /F
```

### Check MongoDB connection
```powershell
cd "c:\Users\sahu4\OneDrive\Pictures\Screenshots\libary\book-haven-display-main\backend"
node -e "require('dotenv').config(); console.log(process.env.MONGODB_URI)"
```

---

## Sample Data Overview

After seeding, you'll have:

**Users (4):**
- alex@example.com (User)
- sarah@example.com (User)
- librarian@library.com (Librarian)
- admin@library.com (Admin)

**Books (12):**
- The Great Gatsby
- To Kill a Mockingbird
- 1984
- Pride and Prejudice
- The Catcher in the Rye
- The Hobbit
- Harry Potter and the Sorcerer's Stone
- The Da Vinci Code
- Sapiens
- Atomic Habits
- Steve Jobs
- Dune

**Active Borrows (3):**
- Alex borrowed: The Great Gatsby, 1984
- Sarah borrowed: The Catcher in the Rye

---

## Quick Reference

| Action | URL |
|--------|-----|
| Frontend | http://localhost:8080 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/api/health |
| API Books | http://localhost:5000/api/books |

| Login | Email | Password |
|-------|-------|----------|
| User | alex@example.com | password123 |
| Librarian | librarian@library.com | librarian123 |
| Admin | admin@library.com | admin123 |

---

**Need more help?** See COMPLETE_NEXT_STEPS.md or MONGODB_CLOUD_SETUP.md
