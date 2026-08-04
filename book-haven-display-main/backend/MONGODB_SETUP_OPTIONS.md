# 🗄️ MongoDB Setup - Choose Your Option

## Option 1: Cloud MongoDB (Recommended - No Installation!)

Use MongoDB Atlas (free forever) - **FASTEST SETUP**

### Steps:

1. **Create Free Account** (2 minutes)
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with Google/GitHub or email
   - Choose "Free Shared" cluster
   - Select AWS as provider
   - Choose closest region (e.g., us-east-1)
   - Click "Create Cluster"

2. **Get Connection String** (1 minute)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/`)
   - Replace `<password>` with your actual password
   - Add database name at the end: `...mongodb.net/book_haven`

3. **Setup Network Access** (30 seconds)
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

4. **Update Backend .env**
   - Open `backend/.env`
   - Replace `MONGODB_URI` with your Atlas connection string
   - Example: `MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/book_haven`

5. **Done!** Run the seed and start backend

✅ **Pros**: No installation, works immediately, accessible anywhere, free forever
❌ **Cons**: Requires internet connection

---

## Option 2: Local MongoDB (Traditional)

Install MongoDB Community Edition on your machine

### Steps:

1. **Download MongoDB** (5 minutes)
   - Visit: https://www.mongodb.com/try/download/community
   - Version: 7.0.x (Current)
   - Platform: Windows
   - Package: MSI
   - Click "Download"

2. **Install MongoDB** (3 minutes)
   - Run the downloaded MSI file
   - Choose "Complete" installation
   - Install MongoDB as a Service: ✅ YES
   - Install MongoDB Compass: ✅ YES (useful GUI)
   - Click "Install"
   - Wait for installation to complete

3. **Verify Installation**
   ```powershell
   # Open NEW PowerShell window (important!)
   mongod --version
   
   # Should show: db version v7.0.x
   ```

4. **MongoDB is Ready!**
   - Service runs automatically
   - Default port: 27017
   - Your `.env` is already configured correctly

✅ **Pros**: Full control, works offline, faster queries
❌ **Cons**: Requires ~500MB disk space, installation needed

---

## Quick Start Commands (After Setup)

### Using Cloud or Local MongoDB:

```powershell
# 1. Navigate to backend
cd "c:\Users\sahu4\OneDrive\Pictures\Screenshots\libary\book-haven-display-main\backend"

# 2. Seed the database
npm run seed

# 3. Start the backend
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

---

## Testing the Setup

```powershell
# Test backend health
curl http://localhost:5000/api/health

# Test books endpoint
curl http://localhost:5000/api/books
```

---

## Recommendation

**For immediate testing**: Use **Option 1 (Cloud)** - no installation, works in 5 minutes

**For production/development**: Use **Option 2 (Local)** - better for long-term use

Both options work identically with your backend!
