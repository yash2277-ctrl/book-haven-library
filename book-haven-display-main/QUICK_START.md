# 🚀 Quick Start Guide - Book Haven Library System

## Current Status
✅ Frontend dependencies installed
✅ Backend dependencies installed
✅ Complete backend API created
✅ All features implemented

## 📋 What You Need to Do

### Option 1: Quick Test (Without MongoDB - Uses Mock Data)
The frontend is already configured with mock data and can run standalone:

```powershell
# Start the frontend
cd "c:\Users\sahu4\OneDrive\Pictures\Screenshots\libary\book-haven-display-main"
npm run dev
```

Open http://localhost:5173 in your browser.

**Login credentials for frontend-only mode:**
- Any email and password will work (uses mock authentication)
- Try: alex@example.com / password123

### Option 2: Full Setup with Backend (Recommended)

#### Step 1: Install MongoDB

**Download MongoDB Community Edition:**
1. Visit: https://www.mongodb.com/try/download/community
2. Download Windows version (MSI installer)
3. Run installer with default settings
4. MongoDB will install as a Windows service and start automatically

**Verify Installation:**
```powershell
# Open a new PowerShell window after installation
mongod --version
```

#### Step 2: Seed the Database
```powershell
cd "c:\Users\sahu4\OneDrive\Pictures\Screenshots\libary\book-haven-display-main\backend"
npm run seed
```

This creates:
- 4 sample users (regular user, librarian, admin)
- 12 sample books
- 3 sample borrow records

#### Step 3: Start Backend Server
```powershell
# In the backend directory
npm run dev
```

Backend will run at: http://localhost:5000

#### Step 4: Start Frontend
```powershell
# Open another terminal
cd "c:\Users\sahu4\OneDrive\Pictures\Screenshots\libary\book-haven-display-main"
npm run dev
```

Frontend will run at: http://localhost:5173

### 🔐 Login Credentials (After seeding)

**Regular User:**
- Email: alex@example.com
- Password: password123

**Librarian:**
- Email: librarian@library.com
- Password: librarian123

**Admin:**
- Email: admin@library.com
- Password: admin123

## 🎯 Features to Test

### As a User:
1. ✅ Browse book catalog
2. ✅ Search and filter books
3. ✅ View book details
4. ✅ Track borrowed books
5. ✅ View reading progress
6. ✅ See overdue alerts

### As a Librarian:
1. ✅ Add new books
2. ✅ Update book information
3. ✅ View all borrows
4. ✅ Check overdue books
5. ✅ View library statistics

### As an Admin:
1. ✅ All librarian features
2. ✅ Manage users
3. ✅ Delete books
4. ✅ View system analytics

## 📚 API Testing (Optional)

Test the backend API with these curl commands:

```powershell
# Health check
curl http://localhost:5000/api/health

# Register a new user
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"alex@example.com","password":"password123"}'

# Get all books (no auth needed)
curl http://localhost:5000/api/books
```

## 🛠️ Troubleshooting

### MongoDB Won't Start
```powershell
# Check MongoDB service status
Get-Service MongoDB

# Restart MongoDB
net stop MongoDB
net start MongoDB
```

### Port Already in Use
If port 5000 or 5173 is in use:

**Backend:** Edit `backend/.env`
```
PORT=5001
```

**Frontend:** Edit `vite.config.ts`
```typescript
export default defineConfig({
  server: {
    port: 5174
  }
})
```

### Cannot Connect to Database
Make sure MongoDB is running:
```powershell
# Check if MongoDB is running
Get-Process mongod
```

## 📁 Project Files Created

### Backend Structure:
```
backend/
├── models/
│   ├── User.js          ✅ User authentication & profiles
│   ├── Book.js          ✅ Book catalog management
│   └── Borrow.js        ✅ Borrowing system
├── routes/
│   ├── auth.js          ✅ Login, register, profile
│   ├── books.js         ✅ CRUD operations for books
│   ├── borrows.js       ✅ Borrow, return, renew
│   ├── users.js         ✅ User management
│   └── stats.js         ✅ Statistics & analytics
├── middleware/
│   └── auth.js          ✅ JWT authentication
├── utils/
│   └── auth.js          ✅ Token utilities
├── scripts/
│   └── seedDatabase.js  ✅ Sample data seeding
├── server.js            ✅ Express server
├── package.json         ✅ Dependencies
├── .env                 ✅ Configuration
└── README.md            ✅ Documentation
```

## 🌟 Key Features Implemented

### Frontend (React + TypeScript):
- ✅ Modern landing page with animations
- ✅ User authentication (login/register)
- ✅ Protected routes
- ✅ Dashboard with statistics
- ✅ Book catalog with search & filters
- ✅ My Books page with borrow tracking
- ✅ Reading goal visualization
- ✅ Responsive design
- ✅ 40+ UI components (shadcn/ui)
- ✅ Toast notifications
- ✅ Loading states & error handling

### Backend (Node.js + Express + MongoDB):
- ✅ RESTful API architecture
- ✅ JWT authentication
- ✅ Role-based authorization (User, Librarian, Admin)
- ✅ Book CRUD operations
- ✅ Advanced search & filtering
- ✅ Borrowing system with due dates
- ✅ Overdue detection & fines
- ✅ Book renewal (up to 2 times)
- ✅ Statistics & analytics
- ✅ User management
- ✅ Input validation
- ✅ Security middleware (helmet, cors)
- ✅ Error handling
- ✅ Database seeding

## 📊 Database Schema

### User Model:
- Name, email, password (hashed)
- Role (user/librarian/admin)
- Books read, reading goal
- Member since, last login

### Book Model:
- Title, author, ISBN
- Genre, description
- Cover image, pages, year
- Total copies, available copies
- Rating & rating count

### Borrow Model:
- User reference
- Book reference
- Borrowed date, due date, return date
- Status (active/returned/overdue/renewed)
- Renewal count, fine amount

## 🎨 Technology Stack

**Frontend:**
- React 18, TypeScript, Vite
- React Router, TanStack Query
- Framer Motion, shadcn/ui
- Tailwind CSS, Lucide Icons

**Backend:**
- Node.js, Express
- MongoDB, Mongoose
- JWT, bcryptjs
- Helmet, CORS, Morgan

## 📞 Next Steps

1. Install MongoDB (if using Option 2)
2. Seed the database
3. Start both servers
4. Login and explore features
5. Test borrowing books
6. Check statistics
7. Try different user roles

## 💡 Tips

- Use Chrome DevTools to inspect API calls
- Check browser console for any errors
- Backend logs show all API requests
- MongoDB Compass can visualize database
- Test with different user roles for full experience

## 🎉 You're All Set!

The complete library management system is ready to run. Both frontend and backend are fully implemented with:
- Authentication & Authorization
- Book Management
- Borrowing System
- User Profiles
- Statistics Dashboard
- And much more!

For detailed API documentation, see: `backend/README.md`
For project overview, see: `PROJECT_DOCUMENTATION.md`
