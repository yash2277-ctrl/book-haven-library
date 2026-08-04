import express from 'express';
import { body } from 'express-validator';
import Book from '../models/Book.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/books
// @desc    Get all books with filtering, sorting, and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      search,
      genre,
      available,
      sortBy = 'title',
      page = 1,
      limit = 20
    } = req.query;

    // Build query
    let query = { isActive: true };

    // Search by title, author, or ISBN
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by genre
    if (genre && genre !== 'All') {
      query.genre = genre;
    }

    // Filter by availability
    if (available === 'true') {
      query.availableCopies = { $gt: 0 };
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Sorting
    let sort = {};
    switch (sortBy) {
      case 'title':
        sort = { title: 1 };
        break;
      case 'author':
        sort = { author: 1 };
        break;
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'year':
        sort = { publishedYear: -1 };
        break;
      default:
        sort = { title: 1 };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const books = await Book.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(query);

    res.json({
      success: true,
      count: books.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      books
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
});

// @route   GET /api/books/:id
// @desc    Get single book
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({
      success: true,
      book
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
});

// @route   POST /api/books
// @desc    Create a new book
// @access  Private/Librarian/Admin
router.post('/', protect, authorize('librarian', 'admin'), async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      book
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
});

// @route   PUT /api/books/:id
// @desc    Update a book
// @access  Private/Librarian/Admin
router.put('/:id', protect, authorize('librarian', 'admin'), async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Book updated successfully',
      book
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete a book (soft delete)
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Soft delete
    book.isActive = false;
    await book.save();

    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
});

// @route   GET /api/books/genres/list
// @desc    Get all unique genres
// @access  Public
router.get('/genres/list', async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.json({
      success: true,
      genres: ['All', ...genres]
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching genres', error: error.message });
  }
});

export default router;
