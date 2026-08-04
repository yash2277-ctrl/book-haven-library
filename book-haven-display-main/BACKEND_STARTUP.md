# 🚀 Quick Backend Startup Guide

## Current Status:
✅ Frontend is running at: http://localhost:8080

## To Start Backend:

### You Need MongoDB Connection First!

#### Option A: MongoDB Atlas (5 minutes, no installation)

1. **Sign up**: https://www.mongodb.com/cloud/atlas/register
   - Use Google/GitHub for fastest signup

2. **Create free cluster**:
   - Choose M0 FREE tier
   - Select AWS, closest region
   - Click "Create"

3. **Setup security**:
   - Username: bookhavenuser
   - Password: (autogenerate and save it)
   - Network: "Allow from Anywhere"

4. **Get connection string**:
   - Click "Connect" → "Drivers"
   - Copy the connection string
   - Replace `<password>` with your password
   - Add `/book_haven` at the end

5. **Update backend\.env**:
   ```
   MONGODB_URI=mongodb+srv://bookhavenuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/book_haven
   ```

#### Option B: Local MongoDB (15 minutes)

1. Download: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB runs automatically as service

---

## Start Backend Commands:

```powershell
# Open NEW PowerShell window
cd "c:\Users\sahu4\OneDrive\Pictures\Screenshots\libary\book-haven-display-main\backend"

# Seed database (first time only)
npm run seed

# Start backend server
npm run dev
```

**Backend will run at**: http://localhost:5000

---

## Quick Test:

After backend starts:
```powershell
# Test health
curl http://localhost:5000/api/health

# Test books
curl http://localhost:5000/api/books
```

---

## Login Credentials:

Once both are running, go to http://localhost:8080 and login:

- Student: alex@example.com / password123
- Librarian: librarian@library.com / librarian123
- Admin: admin@library.com / admin123

---

## Need Help?

- MONGODB_CLOUD_SETUP.md - Detailed MongoDB Atlas guide
- COPY_PASTE_COMMANDS.md - Ready-to-use commands
- FEATURES_IMPLEMENTATION.md - All features documentation
