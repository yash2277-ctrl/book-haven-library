import express from 'express';
import Book from '../models/Book.js';
import Borrow from '../models/Borrow.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/stats/dashboard
// @desc    Get dashboard statistics
// @access  Private
router.get('/dashboard', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's borrowed books count
    const activeBorrows = await Borrow.countDocuments({
      user: userId,
      status: { $in: ['active', 'renewed'] }
    });

    // Get overdue books count for user
    const now = new Date();
    const overdueCount = await Borrow.countDocuments({
      user: userId,
      dueDate: { $lt: now },
      status: { $in: ['active', 'renewed'] }
    });

    // Get due soon count (within 3 days)
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    
    const dueSoonCount = await Borrow.countDocuments({
      user: userId,
      dueDate: { $gte: now, $lte: threeDaysFromNow },
      status: { $in: ['active', 'renewed'] }
    });

    // Get total books in library
    const totalBooks = await Book.countDocuments({ isActive: true });

    // Get available books
    const availableBooks = await Book.countDocuments({ 
      isActive: true,
      availableCopies: { $gt: 0 }
    });

    // Get user's reading progress
    const user = await User.findById(userId);
    const readingProgress = {
      booksRead: user.booksRead,
      readingGoal: user.readingGoal,
      percentage: Math.round((user.booksRead / user.readingGoal) * 100)
    };

    res.json({
      success: true,
      stats: {
        activeBorrows,
        overdueCount,
        dueSoonCount,
        totalBooks,
        availableBooks,
        readingProgress
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

// @route   GET /api/stats/library
// @desc    Get library-wide statistics (for admin/librarian)
// @access  Private/Admin/Librarian
router.get('/library', protect, async (req, res) => {
  try {
    // Total books
    const totalBooks = await Book.countDocuments({ isActive: true });

    // Total users
    const totalUsers = await User.countDocuments({ isActive: true });

    // Active borrows
    const activeBorrows = await Borrow.countDocuments({
      status: { $in: ['active', 'renewed'] }
    });

    // Overdue books
    const now = new Date();
    const overdueBooks = await Borrow.countDocuments({
      dueDate: { $lt: now },
      status: { $in: ['active', 'renewed'] }
    });

    // Most popular genres
    const popularGenres = await Book.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Top rated books
    const topRatedBooks = await Book.find({ isActive: true })
      .sort({ rating: -1 })
      .limit(5)
      .select('title author rating');

    res.json({
      success: true,
      stats: {
        totalBooks,
        totalUsers,
        activeBorrows,
        overdueBooks,
        popularGenres,
        topRatedBooks
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching library statistics', error: error.message });
  }
});

export default router;
