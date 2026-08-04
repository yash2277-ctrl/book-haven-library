# 🧪 API Testing Guide

Test the Book Haven API with these commands. Copy and paste into PowerShell.

## Prerequisites
- Backend server running on http://localhost:5000
- MongoDB running and seeded with data

## 🏥 Health Check

```powershell
curl http://localhost:5000/api/health
```

Expected: `{"status":"OK","message":"Book Haven API is running","timestamp":"..."}`

---

## 🔐 Authentication Tests

### Register a New User
```powershell
$body = @{
    name = "Test User"
    email = "testuser@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Login
```powershell
$body = @{
    email = "alex@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"

# Save token for later use
$token = $response.token
Write-Host "Token: $token"
```

### Get Current User Profile
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" `
    -Method GET `
    -Headers $headers
```

---

## 📚 Book Tests

### Get All Books
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/books"
```

### Search Books
```powershell
# Search by title
Invoke-RestMethod -Uri "http://localhost:5000/api/books?search=gatsby"

# Filter by genre
Invoke-RestMethod -Uri "http://localhost:5000/api/books?genre=Fiction"

# Show only available books
Invoke-RestMethod -Uri "http://localhost:5000/api/books?available=true"

# Sort by rating
Invoke-RestMethod -Uri "http://localhost:5000/api/books?sortBy=rating"
```

### Get Single Book
```powershell
# First get all books to get an ID
$books = Invoke-RestMethod -Uri "http://localhost:5000/api/books"
$bookId = $books.books[0]._id

# Get that specific book
Invoke-RestMethod -Uri "http://localhost:5000/api/books/$bookId"
```

### Add New Book (Librarian/Admin Only)
```powershell
# First login as librarian
$loginBody = @{
    email = "librarian@library.com"
    password = "librarian123"
} | ConvertTo-Json

$librarianAuth = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -Body $loginBody `
    -ContentType "application/json"

$librarianToken = $librarianAuth.token

# Add new book
$newBook = @{
    title = "The Test Book"
    author = "Test Author"
    genre = "Fiction"
    description = "A test book for API testing"
    isbn = "978-1234567890"
    publishedYear = 2024
    pages = 300
    totalCopies = 5
    availableCopies = 5
    rating = 4.5
} | ConvertTo-Json

$headers = @{
    Authorization = "Bearer $librarianToken"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/books" `
    -Method POST `
    -Body $newBook `
    -Headers $headers `
    -ContentType "application/json"
```

---

## 📖 Borrow Tests

### Borrow a Book
```powershell
# Login as user first
$userLogin = @{
    email = "alex@example.com"
    password = "password123"
} | ConvertTo-Json

$userAuth = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -Body $userLogin `
    -ContentType "application/json"

$userToken = $userAuth.token

# Get available books
$books = Invoke-RestMethod -Uri "http://localhost:5000/api/books?available=true"
$availableBookId = $books.books[0]._id

# Borrow the book
$borrowBody = @{
    bookId = $availableBookId
} | ConvertTo-Json

$headers = @{
    Authorization = "Bearer $userToken"
}

$borrow = Invoke-RestMethod -Uri "http://localhost:5000/api/borrows" `
    -Method POST `
    -Body $borrowBody `
    -Headers $headers `
    -ContentType "application/json"

Write-Host "Borrowed book! Borrow ID: $($borrow.borrow._id)"
```

### Get My Borrowed Books
```powershell
$headers = @{
    Authorization = "Bearer $userToken"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/borrows/my-books" `
    -Method GET `
    -Headers $headers
```

### Renew a Book
```powershell
# Get borrowed books first
$myBorrows = Invoke-RestMethod -Uri "http://localhost:5000/api/borrows/my-books" `
    -Method GET `
    -Headers $headers

$borrowId = $myBorrows.borrows[0]._id

# Renew it
Invoke-RestMethod -Uri "http://localhost:5000/api/borrows/$borrowId/renew" `
    -Method PUT `
    -Headers $headers
```

### Return a Book
```powershell
# Return the borrowed book
Invoke-RestMethod -Uri "http://localhost:5000/api/borrows/$borrowId/return" `
    -Method PUT `
    -Headers $headers
```

---

## 👥 User Tests

### Get All Users (Librarian/Admin Only)
```powershell
$headers = @{
    Authorization = "Bearer $librarianToken"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/users" `
    -Method GET `
    -Headers $headers
```

### Update User Profile
```powershell
$headers = @{
    Authorization = "Bearer $userToken"
}

# Get current user to get ID
$currentUser = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" `
    -Method GET `
    -Headers $headers

$userId = $currentUser.user.id

# Update profile
$updateBody = @{
    name = "Updated Name"
    readingGoal = 100
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/users/$userId" `
    -Method PUT `
    -Body $updateBody `
    -Headers $headers `
    -ContentType "application/json"
```

---

## 📊 Statistics Tests

### Get Dashboard Statistics
```powershell
$headers = @{
    Authorization = "Bearer $userToken"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/stats/dashboard" `
    -Method GET `
    -Headers $headers
```

### Get Library Statistics (Librarian/Admin Only)
```powershell
$headers = @{
    Authorization = "Bearer $librarianToken"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/stats/library" `
    -Method GET `
    -Headers $headers
```

---

## 🔍 Advanced Search Examples

### Combine Multiple Filters
```powershell
# Fiction books, available only, sorted by rating
Invoke-RestMethod -Uri "http://localhost:5000/api/books?genre=Fiction&available=true&sortBy=rating"

# Search with pagination
Invoke-RestMethod -Uri "http://localhost:5000/api/books?page=1&limit=5"

# Search by author
Invoke-RestMethod -Uri "http://localhost:5000/api/books?search=tolkien"
```

---

## 🎯 Complete Test Flow

Here's a complete flow to test all features:

```powershell
# 1. Register a new user
$registerBody = @{
    name = "Complete Test User"
    email = "completetest@example.com"
    password = "password123"
} | ConvertTo-Json

$newUser = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
    -Method POST `
    -Body $registerBody `
    -ContentType "application/json"

$testToken = $newUser.token
Write-Host "✅ User registered successfully"

# 2. Get profile
$headers = @{ Authorization = "Bearer $testToken" }
$profile = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" -Headers $headers
Write-Host "✅ Profile retrieved: $($profile.user.name)"

# 3. Browse books
$books = Invoke-RestMethod -Uri "http://localhost:5000/api/books?available=true"
Write-Host "✅ Found $($books.count) available books"

# 4. Borrow a book
$borrowBody = @{ bookId = $books.books[0]._id } | ConvertTo-Json
$borrow = Invoke-RestMethod -Uri "http://localhost:5000/api/borrows" `
    -Method POST -Body $borrowBody -Headers $headers -ContentType "application/json"
Write-Host "✅ Borrowed: $($borrow.borrow.book.title)"

# 5. Check borrowed books
$myBooks = Invoke-RestMethod -Uri "http://localhost:5000/api/borrows/my-books" -Headers $headers
Write-Host "✅ Currently have $($myBooks.count) borrowed books"

# 6. Get statistics
$stats = Invoke-RestMethod -Uri "http://localhost:5000/api/stats/dashboard" -Headers $headers
Write-Host "✅ Statistics retrieved: $($stats.stats.activeBorrows) active borrows"

Write-Host "`n🎉 All tests passed!"
```

---

## 📝 Notes

- Replace `$token`, `$userToken`, `$librarianToken` with actual tokens from login responses
- Book IDs and User IDs are MongoDB ObjectIDs (24 character hex strings)
- All timestamps are in ISO 8601 format
- Dates are automatically calculated for borrowing (due in 14 days)
- Fine calculation: $1 per day overdue

## 🚨 Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

## 🔧 Troubleshooting

If you get connection errors:
```powershell
# Check if backend is running
curl http://localhost:5000/api/health

# Check MongoDB connection
Get-Service MongoDB
```

If authentication fails:
```powershell
# Make sure you're using the correct token
Write-Host "Current token: $token"

# Re-login if token expired (after 7 days)
```
