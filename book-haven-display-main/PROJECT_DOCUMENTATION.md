# 📚 Book Haven - Library Management System

## Overview
Book Haven is a complete library management system with a modern React frontend and robust Node.js backend. It provides features for browsing books, managing borrowing, tracking reading goals, and library administration.

## ✨ Features Implemented

### 🎨 Frontend Features
1. **Landing Page**
   - Hero section with library showcase
   - Featured books display
   - Statistics section
   - Responsive navigation
   - Modern UI with Framer Motion animations

2. **Authentication System**
   - User login/register
   - Protected routes
   - JWT token management
   - Role-based access control

3. **Dashboard**
   - Personalized welcome message
   - Quick search functionality
   - Statistics overview (borrowed books, overdue, etc.)
   - Borrowed books display
   - Featured books carousel
   - Reading progress tracking

4. **Book Catalog**
   - Advanced search functionality
   - Filter by genre
   - Sort by title, author, rating, year
   - View available books only option
   - Grid/List view toggle
   - Pagination support
   - Book details with ratings

5. **My Books Page**
   - View all borrowed books
   - Due date tracking
   - Overdue alerts
   - Due soon warnings
   - Reading goal visualization
   - Return/Renew functionality

6. **UI Components**
   - 40+ shadcn/ui components
   - Custom animations with Framer Motion
   - Responsive design
   - Dark mode support
   - Toast notifications
   - Loading states
   - Error handling

### 🔧 Backend Features

1. **Authentication & Authorization**
   - User registration with validation
   - Secure login with JWT tokens
   - Password hashing with bcrypt
   - Role-based access (User, Librarian, Admin)
   - Token verification middleware
   - Account activation/deactivation

2. **Book Management**
   - CRUD operations for books
   - Search by title/author
   - Filter by genre and availability
   - Sort by multiple criteria
   - ISBN validation
   - Book rating system
   - Track total and available copies
   - Soft delete functionality

3. **Borrowing System**
   - Borrow books with automatic due date
   - Return books with fine calculation
   - Renew books (up to 2 times)
   - Overdue detection
   - Prevent duplicate borrowing
   - Automatic availability updates
   - Borrow history tracking

4. **User Management**
   - View all users (admin/librarian)
   - Update user profiles
   - Reading goals and tracking
   - Books read counter
   - Member since tracking
   - Last login tracking

5. **Statistics & Analytics**
   - Personal dashboard stats
   - Library-wide statistics
   - Popular genres tracking
   - Top-rated books
   - Active borrows count
   - Overdue books monitoring

6. **Security Features**
   - Helmet.js for security headers
   - CORS configuration
   - Rate limiting support
   - Input validation
   - SQL injection prevention
   - XSS protection

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (v6+)
- npm or yarn

### Installation

1. **Clone and Navigate:**
   ```bash
   cd book-haven-display-main
   ```

2. **Frontend Setup:**
   ```bash
   # Install dependencies (already done)
   npm install

   # Start development server
   npm run dev
   ```
   Frontend will run at: http://localhost:5173

3. **Backend Setup:**
   ```bash
   cd backend
   
   # Install dependencies (already done)
   npm install

   # Make sure MongoDB is running
   # Windows: MongoDB runs as a service automatically
   # Check: services.msc -> MongoDB

   # Seed the database with sample data
   npm run seed

   # Start the backend server
   npm run dev
   ```
   Backend will run at: http://localhost:5000

### Sample Login Credentials

**Regular User:**
- Email: alex@example.com
- Password: password123

**Librarian:**
- Email: librarian@library.com
- Password: librarian123

**Admin:**
- Email: admin@library.com
- Password: admin123

## 📁 Project Structure

```
book-haven-display-main/
├── src/                          # Frontend source
│   ├── components/              # React components
│   │   ├── BookCard.tsx        # Book display card
│   │   ├── BorrowedBookCard.tsx # Borrowed book card
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Footer component
│   │   ├── Layout.tsx          # Page layout wrapper
│   │   ├── StatsSection.tsx    # Statistics display
│   │   ├── ScrollReveal.tsx    # Scroll animations
│   │   └── ui/                 # 40+ shadcn components
│   ├── pages/                  # Page components
│   │   ├── Landing.tsx         # Landing page
│   │   ├── Login.tsx           # Login page
│   │   ├── Dashboard.tsx       # User dashboard
│   │   ├── Catalog.tsx         # Book catalog
│   │   ├── MyBooks.tsx         # Borrowed books
│   │   └── NotFound.tsx        # 404 page
│   ├── context/                # React context
│   │   └── AuthContext.tsx     # Authentication state
│   ├── lib/                    # Utilities
│   │   ├── books-data.ts       # Book data types
│   │   └── utils.ts            # Helper functions
│   └── hooks/                  # Custom React hooks
│
├── backend/                     # Backend API
│   ├── models/                 # Mongoose models
│   │   ├── User.js            # User model
│   │   ├── Book.js            # Book model
│   │   └── Borrow.js          # Borrow model
│   ├── routes/                # API routes
│   │   ├── auth.js            # Authentication routes
│   │   ├── books.js           # Book routes
│   │   ├── borrows.js         # Borrow routes
│   │   ├── users.js           # User routes
│   │   └── stats.js           # Statistics routes
│   ├── middleware/            # Express middleware
│   │   └── auth.js            # Auth middleware
│   ├── utils/                 # Utility functions
│   ├── scripts/               # Database scripts
│   │   └── seedDatabase.js    # Seed script
│   ├── server.js              # Server entry point
│   └── .env                   # Environment variables
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-password` - Update password

### Books
- `GET /api/books` - List all books (with filters)
- `GET /api/books/:id` - Get book details
- `POST /api/books` - Add new book (Librarian+)
- `PUT /api/books/:id` - Update book (Librarian+)
- `DELETE /api/books/:id` - Delete book (Admin)

### Borrows
- `GET /api/borrows` - List borrows
- `GET /api/borrows/my-books` - User's borrowed books
- `POST /api/borrows` - Borrow a book
- `PUT /api/borrows/:id/return` - Return book
- `PUT /api/borrows/:id/renew` - Renew book
- `GET /api/borrows/overdue` - Overdue books (Librarian+)

### Users
- `GET /api/users` - List users (Librarian+)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user profile
- `PUT /api/users/:id/deactivate` - Deactivate user (Admin)

### Statistics
- `GET /api/stats/dashboard` - Dashboard statistics
- `GET /api/stats/library` - Library statistics (Librarian+)

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **TanStack Query** - Data fetching
- **Framer Motion** - Animations
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **date-fns** - Date handling
- **Zod** - Validation
- **React Hook Form** - Form handling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Validation
- **helmet** - Security
- **cors** - CORS support
- **morgan** - Logging

## 📝 Key Features Detail

### 1. Book Borrowing System
- Users can borrow available books
- Automatic due date (14 days from borrow)
- Maximum 2 renewals per book
- Each renewal extends 14 days
- Automatic overdue detection
- Fine calculation ($1/day overdue)
- Available copies tracked automatically

### 2. Search & Filter
- Real-time search by title/author
- Filter by 9 genres
- Sort by title, author, rating, year
- Show available books only
- Pagination for large catalogs

### 3. Reading Goals
- Set personal reading goals
- Track books read
- Visual progress display
- Goal achievement percentage

### 4. Role-Based Access
- **User**: Browse, borrow, return books
- **Librarian**: Manage books, view all borrows
- **Admin**: Full system access, user management

### 5. Statistics Dashboard
- Active borrows count
- Overdue books alert
- Due soon warnings
- Total books in library
- Available books count
- Reading progress visualization

## 🔒 Security Features
- JWT token authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based authorization
- Input validation
- CORS configuration
- Helmet security headers
- SQL injection prevention
- XSS protection

## 📱 Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Touch-friendly interface
- Adaptive navigation

## 🎨 UI/UX Features
- Smooth animations
- Loading states
- Error handling
- Toast notifications
- Empty states
- Skeleton loaders
- Hover effects
- Focus states

## 🚦 How to Use

### For Regular Users:
1. Register/Login
2. Browse the book catalog
3. Search or filter books
4. Borrow available books
5. View borrowed books in "My Books"
6. Track due dates
7. Renew books (up to 2 times)
8. Return books when finished

### For Librarians:
1. Login with librarian account
2. Add new books to catalog
3. Update book information
4. View all borrow records
5. Check overdue books
6. Manage library statistics

### For Admins:
1. Login with admin account
2. All librarian features
3. Manage users
4. Delete books
5. Deactivate user accounts
6. View system-wide statistics

## 🐛 Troubleshooting

### MongoDB Connection Issues:
```bash
# Check if MongoDB is running
# Windows: services.msc -> MongoDB
# Or restart MongoDB service
net stop MongoDB
net start MongoDB
```

### Port Already in Use:
- Frontend: Change port in vite.config.ts
- Backend: Change PORT in .env file

### Authentication Issues:
- Clear browser localStorage
- Check JWT_SECRET in .env
- Verify token expiration

## 📈 Future Enhancements
- Book reviews and ratings
- Wishlist functionality
- Email notifications
- PDF book management
- Library cards with QR codes
- Multi-library support
- Advanced analytics
- Payment integration for fines
- Book recommendations
- Social features

## 📄 License
MIT

---

**Note**: This is a demonstration project. For production use, add:
- Environment-specific configurations
- Comprehensive error logging
- Database backups
- Rate limiting
- Email service integration
- Payment gateway
- Advanced security measures
