import express from 'express';
import mongoose from 'mongoose';
import Borrow from '../models/Borrow.js';
import Book from '../models/Book.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/borrows
// @desc    Get all borrows (admin/librarian) or user's borrows
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let query = {};

    // If user is not admin/librarian, only show their borrows
    if (req.user.role === 'user') {
      query.user = req.user.id;
    }

    // Filter by status if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    const borrows = await Borrow.find(query)
      .populate('book', 'title author cover genre')
      .populate('user', 'name email')
      .sort({ borrowedDate: -1 });

    res.json({
      success: true,
      count: borrows.length,
      borrows
    });
  } catch (error) {
    console.error('Get borrows error:', error);
    res.status(500).json({ message: 'Error fetching borrows', error: error.message });
  }
});

// @route   GET /api/borrows/my-books
// @desc    Get current user's active borrowed books
// @access  Private
router.get('/my-books', protect, async (req, res) => {
  try {
    const borrows = await Borrow.find({
      user: req.user.id,
      status: { $in: ['active', 'renewed', 'overdue'] }
    })
      .populate('book')
      .sort({ dueDate: 1 });

    res.json({
      success: true,
      count: borrows.length,
      borrows
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching borrowed books', error: error.message });
  }
});

// @route   POST /api/borrows
// @desc    Borrow a book
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { bookId } = req.body;

    // Get user with borrowing limit
    const user = await mongoose.model('User').findById(req.user.id);
    
    // Check current active borrows count
    const activeBorrowsCount = await Borrow.countDocuments({
      user: req.user.id,
      status: { $in: ['active', 'renewed'] }
    });

    // Check if user has reached borrowing limit
    if (activeBorrowsCount >= user.borrowingLimit) {
      return res.status(400).json({ 
        message: `Borrowing limit reached. You can borrow up to ${user.borrowingLimit} books at a time.`,
        currentBorrows: activeBorrowsCount,
        limit: user.borrowingLimit
      });
    }

    // Check if book exists and is available
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'Book is not available' });
    }

    // Check if user already has this book borrowed
    const existingBorrow = await Borrow.findOne({
      user: req.user.id,
      book: bookId,
      status: { $in: ['active', 'renewed'] }
    });

    if (existingBorrow) {
      return res.status(400).json({ message: 'You have already borrowed this book' });
    }

    // Create borrow record
    const borrow = await Borrow.create({
      user: req.user.id,
      book: bookId
    });

    const populatedBorrow = await Borrow.findById(borrow._id)
      .populate('book')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      borrow: populatedBorrow
    });
  } catch (error) {
    console.error('Borrow book error:', error);
    res.status(500).json({ message: 'Error borrowing book', error: error.message });
  }
});

// @route   PUT /api/borrows/:id/return
// @desc    Return a borrowed book
// @access  Private
router.put('/:id/return', protect, async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);

    if (!borrow) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }

    // Check if user owns this borrow or is admin/librarian
    if (borrow.user.toString() !== req.user.id && !['admin', 'librarian'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized to return this book' });
    }

    const returnedBorrow = await Borrow.returnBook(req.params.id);
    const populatedBorrow = await Borrow.findById(returnedBorrow._id)
      .populate('book')
      .populate('user', 'name email');

    res.json({
      success: true,
      message: 'Book returned successfully',
      borrow: populatedBorrow,
      fine: returnedBorrow.fine
    });
  } catch (error) {
    console.error('Return book error:', error);
    res.status(500).json({ message: error.message || 'Error returning book' });
  }
});

// @route   PUT /api/borrows/:id/renew
// @desc    Renew a borrowed book
// @access  Private
router.put('/:id/renew', protect, async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);

    if (!borrow) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }

    // Check if user owns this borrow
    if (borrow.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to renew this book' });
    }

    const renewedBorrow = await Borrow.renewBook(req.params.id);
    const populatedBorrow = await Borrow.findById(renewedBorrow._id)
      .populate('book')
      .populate('user', 'name email');

    res.json({
      success: true,
      message: 'Book renewed successfully',
      borrow: populatedBorrow
    });
  } catch (error) {
    console.error('Renew book error:', error);
    res.status(400).json({ message: error.message || 'Error renewing book' });
  }
});

// @route   GET /api/borrows/overdue
// @desc    Get overdue books
// @access  Private/Librarian/Admin
router.get('/overdue', protect, authorize('librarian', 'admin'), async (req, res) => {
  try {
    const now = new Date();
    const overdueBooks = await Borrow.find({
      dueDate: { $lt: now },
      status: { $in: ['active', 'renewed'] }
    })
      .populate('book', 'title author')
      .populate('user', 'name email')
      .sort({ dueDate: 1 });

    res.json({
      success: true,
      count: overdueBooks.length,
      borrows: overdueBooks
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching overdue books', error: error.message });
  }
});

export default router;
