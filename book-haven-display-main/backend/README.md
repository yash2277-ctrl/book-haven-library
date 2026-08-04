# Book Haven Library Management System - Backend

A complete RESTful API backend for the Book Haven library management system, built with Node.js, Express, and MongoDB.

## 🚀 Features

### Authentication & Authorization
- User registration and login with JWT
- Role-based access control (User, Librarian, Admin)
- Secure password hashing with bcrypt
- Token-based authentication

### Book Management
- CRUD operations for books
- Advanced search and filtering
- Genre categorization
- Book availability tracking
- Pagination and sorting

### Borrowing System
- Borrow and return books
- Automatic due date calculation (14 days)
- Book renewal (up to 2 times)
- Overdue detection and fine calculation
- Borrow history tracking

### User Management
- User profile management
- Reading goals and progress tracking
- Books read counter
- Account activation/deactivation

### Statistics & Analytics
- Personal dashboard statistics
- Library-wide analytics
- Popular genres tracking
- Top-rated books

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/book_haven
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start MongoDB:**
   ```bash
   # Make sure MongoDB is running on your system
   # Windows: MongoDB should be running as a service
   # Mac: brew services start mongodb-community
   # Linux: sudo systemctl start mongod
   ```

4. **Seed the database (optional):**
   ```bash
   npm run seed
   ```
   This will create sample users, books, and borrow records.

5. **Start the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

The API will be running at `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-password` - Update password

### Books
- `GET /api/books` - Get all books (with filters)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create book (Librarian/Admin)
- `PUT /api/books/:id` - Update book (Librarian/Admin)
- `DELETE /api/books/:id` - Delete book (Admin)
- `GET /api/books/genres/list` - Get all genres

### Borrows
- `GET /api/borrows` - Get all borrows
- `GET /api/borrows/my-books` - Get user's borrowed books
- `POST /api/borrows` - Borrow a book
- `PUT /api/borrows/:id/return` - Return a book
- `PUT /api/borrows/:id/renew` - Renew a book
- `GET /api/borrows/overdue` - Get overdue books (Librarian/Admin)

### Users
- `GET /api/users` - Get all users (Librarian/Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `PUT /api/users/:id/deactivate` - Deactivate user (Admin)

### Statistics
- `GET /api/stats/dashboard` - Get dashboard statistics
- `GET /api/stats/library` - Get library statistics (Librarian/Admin)

## 🔐 Sample Credentials

After running the seed script, you can login with:

**Regular User:**
- Email: alex@example.com
- Password: password123

**Librarian:**
- Email: librarian@library.com
- Password: librarian123

**Admin:**
- Email: admin@library.com
- Password: admin123

## 🏗️ Project Structure

```
backend/
├── models/           # Mongoose models
│   ├── User.js
│   ├── Book.js
│   └── Borrow.js
├── routes/           # API routes
│   ├── auth.js
│   ├── books.js
│   ├── borrows.js
│   ├── users.js
│   └── stats.js
├── middleware/       # Custom middleware
│   └── auth.js
├── utils/           # Utility functions
│   └── auth.js
├── scripts/         # Database scripts
│   └── seedDatabase.js
├── server.js        # Entry point
├── .env             # Environment variables
└── package.json     # Dependencies
```

## 🔧 Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - CORS support
- **helmet** - Security headers
- **morgan** - Logging

## 📝 License

MIT
