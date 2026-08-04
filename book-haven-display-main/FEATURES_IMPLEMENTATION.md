# 📚 Book Haven - Complete Feature Implementation

## ✅ All Requested Features Implemented

### 1. 📖 Book Availability Tracking

#### Status Types:
- **Available** - Book has copies available for borrowing
- **Issued** - All copies are currently borrowed
- **Out of Stock** - No copies exist (totalCopies = 0)

#### Implementation:
```javascript
// Auto-updates based on availableCopies
if (availableCopies > 0) → status = 'available'
if (availableCopies === 0 && totalCopies > 0) → status = 'issued'
if (totalCopies === 0) → status = 'out of stock'
```

#### API Usage:
```javascript
// Filter by status
GET /api/books?status=available
GET /api/books?status=issued
GET /api/books?status=out%20of%20stock
```

---

### 2. 🏷️ Book Genres & Sorting

#### All Genres Available:
1. **Fiction** - Literary fiction and general fiction
2. **Non-Fiction** - Factual and informational books
3. **Poetry** - Poetry collections and verse
4. **Contemporary** - Modern literary fiction
5. **Historical Fiction** - Fiction set in historical periods
6. **Science Fiction** - Futuristic and speculative fiction
7. **Mystery** - Detective and crime fiction
8. **Romance** - Love stories
9. **Biography** - Life stories
10. **History** - Historical non-fiction
11. **Self-Help** - Personal development
12. **Fantasy** - Magical and fantastical worlds

#### Sorting Options:
```javascript
// Sort by genre
GET /api/books?genre=Poetry
GET /api/books?genre=Contemporary
GET /api/books?genre=Historical Fiction

// Combine with other filters
GET /api/books?genre=Fiction&sortBy=rating
GET /api/books?genre=Poetry&available=true
```

---

### 3. 🔍 Search and Filter Books

#### Search Capabilities:
- **Book Name** (Title) - Case-insensitive search
- **Author Name** - Case-insensitive search  
- **ISBN Number** - Exact or partial match

#### API Examples:
```javascript
// Search by book name
GET /api/books?search=gatsby

// Search by author
GET /api/books?search=fitzgerald

// Search by ISBN
GET /api/books?search=978-0743273565

// Combined search (searches all fields)
GET /api/books?search=tolkien
```

#### Advanced Filtering:
```javascript
// Multiple filters
GET /api/books?search=harry&genre=Fantasy&available=true&sortBy=rating

// Pagination
GET /api/books?page=1&limit=10

// Status filter
GET /api/books?status=available&genre=Poetry
```

---

### 4. 📚 Managing Books and Details

#### Book Attributes:
- **ISBN** - Unique identifier (required, validated)
- **Title** - Book name (required, max 200 chars)
- **Author** - Author name (required, max 100 chars)
- **Genre** - From predefined list (required)
- **Description** - Book summary (max 1000 chars)
- **Cover** - Image URL
- **Published Year** - Publication date
- **Pages** - Number of pages
- **Total Copies** - Total books in library
- **Available Copies** - Currently available
- **Rating** - Average rating (0-5)
- **Status** - Auto-calculated (available/issued/out of stock)

#### Operations:

**Add New Book:**
```javascript
POST /api/books
Authorization: Bearer {librarian_or_admin_token}
Content-Type: application/json

{
  "isbn": "978-1234567890",
  "title": "New Book Title",
  "author": "Author Name",
  "genre": "Contemporary",
  "description": "Book description here",
  "publishedYear": 2024,
  "pages": 350,
  "totalCopies": 5,
  "availableCopies": 5
}
```

**Update Book Details:**
```javascript
PUT /api/books/{bookId}
Authorization: Bearer {librarian_or_admin_token}
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author",
  "totalCopies": 10,
  "genre": "Historical Fiction"
}
```

**Delete Book:**
```javascript
DELETE /api/books/{bookId}
Authorization: Bearer {admin_token}

// Soft delete - sets isActive: false
```

**Get Book Details:**
```javascript
GET /api/books/{bookId}

// Returns full book information including:
{
  "isbn": "978-1234567890",
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Fiction",
  "description": "...",
  "totalCopies": 5,
  "availableCopies": 3,
  "status": "available",
  "rating": 4.5,
  ...
}
```

---

### 5. 👥 User Management System

#### User Types:
- **Student** - Can borrow books (default limit: 3 books)
- **Librarian** - Can manage books (limit: 10 books)
- **Admin** - Full system access (limit: 10 books)

#### Profile Details:

**User Attributes:**
- **User ID** - Unique identifier (e.g., STU001, LIB001, ADM001)
- **Name** - Full name
- **Email** - Unique email address
- **Password** - Encrypted password
- **Role** - student/librarian/admin
- **Borrowing Limit** - Maximum books allowed
- **Books Read** - Total completed books
- **Reading Goal** - Annual reading target
- **Member Since** - Registration date
- **Avatar** - Profile picture URL

#### User Registration:
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "userId": "STU003",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"  // Optional, defaults to "student"
}

// System automatically assigns:
// - borrowingLimit: 3 (for students), 10 (for librarian/admin)
// - memberSince: current date
// - booksRead: 0
// - readingGoal: 50
```

#### User Login:
```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

// Returns JWT token and user profile with:
// - userId, name, email, role
// - borrowingLimit
// - booksRead, readingGoal
```

#### Get User Profile:
```javascript
GET /api/auth/me
Authorization: Bearer {token}

// Returns complete profile including borrowingLimit
```

#### Update Profile:
```javascript
PUT /api/users/{userId}
Authorization: Bearer {token}

{
  "name": "Updated Name",
  "avatar": "https://example.com/avatar.jpg",
  "readingGoal": 100
}
```

#### Borrowing Limit Enforcement:
```javascript
// When borrowing a book:
POST /api/borrows
Authorization: Bearer {student_token}

{
  "bookId": "book_id_here"
}

// System checks:
// 1. Current active borrows count
// 2. User's borrowing limit
// 3. Returns error if limit reached

// Example error response:
{
  "message": "Borrowing limit reached. You can borrow up to 3 books at a time.",
  "currentBorrows": 3,
  "limit": 3
}
```

---

## 📊 Sample Data Included

### Users (4):
1. **STU001** - Alex Thompson (Student)
   - Email: alex@example.com
   - Password: password123
   - Limit: 3 books

2. **STU002** - Sarah Johnson (Student)
   - Email: sarah@example.com
   - Password: password123
   - Limit: 3 books

3. **LIB001** - John Librarian (Librarian)
   - Email: librarian@library.com
   - Password: librarian123
   - Limit: 10 books

4. **ADM001** - Library Admin (Admin)
   - Email: admin@library.com
   - Password: admin123
   - Limit: 10 books

### Books (16):
Spanning all 12 genres:
- Fiction: The Great Gatsby, To Kill a Mockingbird, The Catcher in the Rye
- Science Fiction: 1984, Dune
- Romance: Pride and Prejudice
- Fantasy: The Hobbit, Harry Potter
- Mystery: The Da Vinci Code
- History: Sapiens
- Self-Help: Atomic Habits
- Biography: Steve Jobs
- Poetry: The Sun and Her Flowers
- Contemporary: Normal People
- Historical Fiction: All the Light We Cannot See, The Book Thief

---

## 🔐 Access Control

### Public Access:
- Browse books catalog
- Search and filter books
- View book details

### Student Access:
- All public access
- Borrow books (up to limit)
- Return books
- Renew books
- View personal borrowed books
- View personal statistics

### Librarian Access:
- All student access
- Add new books
- Update book details
- View all borrows
- View overdue books
- View library statistics

### Admin Access:
- All librarian access
- Delete books
- Manage users
- Deactivate accounts
- Full system access

---

## 🚀 API Endpoints Summary

### Books:
- `GET /api/books` - List all books (search, filter, sort)
- `GET /api/books/:id` - Get book details
- `POST /api/books` - Add book (Librarian+)
- `PUT /api/books/:id` - Update book (Librarian+)
- `DELETE /api/books/:id` - Delete book (Admin)

### Users:
- `POST /api/auth/register` - Register (userId required)
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get profile
- `PUT /api/users/:id` - Update profile
- `GET /api/users` - List users (Librarian+)

### Borrows:
- `POST /api/borrows` - Borrow book (checks limit)
- `GET /api/borrows/my-books` - My borrowed books
- `PUT /api/borrows/:id/return` - Return book
- `PUT /api/borrows/:id/renew` - Renew book
- `GET /api/borrows/overdue` - Overdue books (Librarian+)

### Statistics:
- `GET /api/stats/dashboard` - Personal stats
- `GET /api/stats/library` - Library stats (Librarian+)

---

## 🎯 Key Features

✅ **Book Status Auto-Update** - Status automatically updates when books borrowed/returned
✅ **ISBN Search** - Search books by ISBN number
✅ **12 Genres** - Including Poetry, Contemporary, Historical Fiction
✅ **User ID System** - Unique identifiers (STU001, LIB001, etc.)
✅ **Borrowing Limit** - Enforced per user role (3 for students, 10 for staff)
✅ **Role-Based Access** - Student, Librarian, Admin with different permissions
✅ **Complete CRUD** - Full create, read, update, delete for books
✅ **Advanced Search** - By title, author, ISBN with filters and sorting
✅ **Profile Management** - Detailed user profiles with borrowing history

---

## 📝 Testing Examples

See `backend/API_TESTING.md` for PowerShell commands to test all features.

**Quick Test:**
```powershell
# Search by ISBN
curl "http://localhost:5000/api/books?search=978-0743273565"

# Filter by genre
curl "http://localhost:5000/api/books?genre=Poetry"

# Check available books
curl "http://localhost:5000/api/books?status=available"

# Get book by status
curl "http://localhost:5000/api/books?status=issued"
```

---

## 🎉 All Features Complete!

Every requested feature has been implemented and is ready to use:
- ✅ Book availability tracking (available/issued/out of stock)
- ✅ Sorting by 12 genres including Poetry, Contemporary, Historical Fiction
- ✅ Search by book name, author name, and ISBN
- ✅ Complete book management (Add, Update, Delete)
- ✅ User management with userId and borrowing limits
- ✅ Student and Librarian roles with appropriate permissions

The system is production-ready and fully documented!
