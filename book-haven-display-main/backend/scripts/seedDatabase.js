import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import User from '../models/User.js';
import Book from '../models/Book.js';
import Borrow from '../models/Borrow.js';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/book_haven');

// Sample data
const users = [
  {
    userId: 'STU001',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    password: 'password123',
    role: 'student',
    borrowingLimit: 3,
    booksRead: 47,
    readingGoal: 50
  },
  {
    userId: 'STU002',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    role: 'student',
    borrowingLimit: 3,
    booksRead: 23,
    readingGoal: 30
  },
  {
    userId: 'LIB001',
    name: 'John Librarian',
    email: 'librarian@library.com',
    password: 'librarian123',
    role: 'librarian',
    borrowingLimit: 10,
    booksRead: 89,
    readingGoal: 100
  },
  {
    userId: 'ADM001',
    name: 'Library Admin',
    email: 'admin@library.com',
    password: 'admin123',
    role: 'admin',
    borrowingLimit: 10,
    booksRead: 150,
    readingGoal: 200
  }
];

const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    genre: 'Fiction',
    description: 'A story of decadence and excess, exploring the American Dream in the Jazz Age.',
    isbn: '978-0743273565',
    publishedYear: 1925,
    pages: 180,
    totalCopies: 5,
    availableCopies: 3,
    rating: 4.5,
    ratingCount: 1250
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    genre: 'Fiction',
    description: 'A gripping tale of racial injustice and moral growth in the American South.',
    isbn: '978-0446310789',
    publishedYear: 1960,
    pages: 281,
    totalCopies: 4,
    availableCopies: 2,
    rating: 4.8,
    ratingCount: 2100
  },
  {
    title: '1984',
    author: 'George Orwell',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop',
    genre: 'Science Fiction',
    description: 'A dystopian masterpiece about totalitarianism and surveillance.',
    isbn: '978-0451524935',
    publishedYear: 1949,
    pages: 328,
    totalCopies: 3,
    availableCopies: 0,
    rating: 4.7,
    ratingCount: 1890
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    genre: 'Romance',
    description: 'A witty romantic novel about love, reputation, and class in Regency England.',
    isbn: '978-0141439518',
    publishedYear: 1813,
    pages: 432,
    totalCopies: 6,
    availableCopies: 4,
    rating: 4.6,
    ratingCount: 1670
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
    genre: 'Fiction',
    description: 'A story about teenage rebellion and alienation in 1950s America.',
    isbn: '978-0316769174',
    publishedYear: 1951,
    pages: 234,
    totalCopies: 4,
    availableCopies: 1,
    rating: 4.2,
    ratingCount: 1450
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop',
    genre: 'Fantasy',
    description: 'A fantasy adventure about a hobbit\'s unexpected journey.',
    isbn: '978-0547928227',
    publishedYear: 1937,
    pages: 310,
    totalCopies: 5,
    availableCopies: 3,
    rating: 4.7,
    ratingCount: 2340
  },
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    cover: 'https://images.unsplash.com/photo-1551029506-0807df4e8e3a?w=400&h=600&fit=crop',
    genre: 'Fantasy',
    description: 'The magical beginning of Harry Potter\'s journey at Hogwarts.',
    isbn: '978-0439708180',
    publishedYear: 1997,
    pages: 309,
    totalCopies: 8,
    availableCopies: 5,
    rating: 4.9,
    ratingCount: 3200
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
    genre: 'Mystery',
    description: 'A thrilling mystery involving secret societies and religious history.',
    isbn: '978-0307474278',
    publishedYear: 2003,
    pages: 454,
    totalCopies: 4,
    availableCopies: 2,
    rating: 4.3,
    ratingCount: 1980
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    cover: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=600&fit=crop',
    genre: 'History',
    description: 'An exploration of human history from the Stone Age to the present.',
    isbn: '978-0062316097',
    publishedYear: 2011,
    pages: 443,
    totalCopies: 3,
    availableCopies: 1,
    rating: 4.6,
    ratingCount: 1560
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    genre: 'Self-Help',
    description: 'A practical guide to building good habits and breaking bad ones.',
    isbn: '978-0735211292',
    publishedYear: 2018,
    pages: 320,
    totalCopies: 6,
    availableCopies: 4,
    rating: 4.7,
    ratingCount: 2450
  },
  {
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    cover: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop',
    genre: 'Biography',
    description: 'The authorized biography of Apple co-founder Steve Jobs.',
    isbn: '978-1451648539',
    publishedYear: 2011,
    pages: 656,
    totalCopies: 3,
    availableCopies: 2,
    rating: 4.5,
    ratingCount: 1870
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    cover: 'https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=400&h=600&fit=crop',
    genre: 'Science Fiction',
    description: 'A science fiction epic set in a distant future among the stars.',
    isbn: '978-0441172719',
    publishedYear: 1965,
    pages: 688,
    totalCopies: 4,
    availableCopies: 1,
    rating: 4.6,
    ratingCount: 2100
  },
  {
    title: 'The Sun and Her Flowers',
    author: 'Rupi Kaur',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    genre: 'Poetry',
    description: 'A collection of poetry about growth, healing, and femininity.',
    isbn: '978-1501175626',
    publishedYear: 2017,
    pages: 256,
    totalCopies: 5,
    availableCopies: 3,
    rating: 4.4,
    ratingCount: 980
  },
  {
    title: 'Normal People',
    author: 'Sally Rooney',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    genre: 'Contemporary',
    description: 'A story of mutual fascination, friendship and love between two people in modern Ireland.',
    isbn: '978-1984822178',
    publishedYear: 2018,
    pages: 266,
    totalCopies: 6,
    availableCopies: 4,
    rating: 4.5,
    ratingCount: 1560
  },
  {
    title: 'All the Light We Cannot See',
    author: 'Anthony Doerr',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop',
    genre: 'Historical Fiction',
    description: 'A novel about a blind French girl and a German boy during World War II.',
    isbn: '978-1501173219',
    publishedYear: 2014,
    pages: 531,
    totalCopies: 4,
    availableCopies: 2,
    rating: 4.7,
    ratingCount: 2890
  },
  {
    title: 'The Book Thief',
    author: 'Markus Zusak',
    cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
    genre: 'Historical Fiction',
    description: 'A story narrated by Death about a young girl in Nazi Germany.',
    isbn: '978-0375842207',
    publishedYear: 2005,
    pages: 552,
    totalCopies: 3,
    availableCopies: 0,
    rating: 4.8,
    ratingCount: 3100
  }
];

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Book.deleteMany();
    await Borrow.deleteMany();

    console.log('🗑️  Data Destroyed...');

    // Insert users
    const createdUsers = await User.create(users);
    console.log(`✅ ${createdUsers.length} Users Created`);

    // Insert books
    const createdBooks = await Book.create(books);
    console.log(`✅ ${createdBooks.length} Books Created`);

    // Create sample borrows - ONLY FOR STUDENTS (NOT librarians/admins)
    const sampleBorrows = [
      {
        user: createdUsers[0]._id, // Alex (Student STU001)
        book: createdBooks[0]._id,
        borrowedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // 9 days from now
        status: 'active'
      },
      {
        user: createdUsers[0]._id, // Alex (Student STU001)
        book: createdBooks[2]._id,
        borrowedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        status: 'active'
      },
      {
        user: createdUsers[1]._id, // Sarah (Student STU002)
        book: createdBooks[4]._id,
        borrowedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'active'
      }
      // NOTE: Librarians (LIB001) and Admins (ADM001) do NOT borrow books - they manage the system
    ];

    // Update book availability for borrowed books
    await Book.findByIdAndUpdate(createdBooks[0]._id, { $inc: { availableCopies: -1 } });
    await Book.findByIdAndUpdate(createdBooks[2]._id, { $inc: { availableCopies: -1 } });
    await Book.findByIdAndUpdate(createdBooks[4]._id, { $inc: { availableCopies: -1 } });

    const createdBorrows = await Borrow.create(sampleBorrows);
    console.log(`✅ ${createdBorrows.length} Borrow Records Created (Students Only)`);

    console.log('✨ Data Imported Successfully!');
    console.log('\n📝 Sample Login Credentials:');
    console.log('   Student (STU001): alex@example.com / password123');
    console.log('   Student (STU002): sarah@example.com / password123');
    console.log('   Librarian (LIB001): librarian@library.com / librarian123');
    console.log('   Admin (ADM001): admin@library.com / admin123');
    console.log('\n📚 Books Created: 16 books across all genres');
    console.log('   - Fiction, Non-Fiction, Science Fiction');
    console.log('   - Mystery, Romance, Biography, History');
    console.log('   - Self-Help, Fantasy, Poetry');
    console.log('   - Contemporary, Historical Fiction\n');
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Book.deleteMany();
    await Borrow.deleteMany();

    console.log('🗑️  Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
