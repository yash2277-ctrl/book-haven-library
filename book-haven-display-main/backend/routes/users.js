import express from 'express';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin/Librarian
router.get('/', protect, authorize('admin', 'librarian'), async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private/Admin/Librarian or own profile
router.get('/:id', protect, async (req, res) => {
  try {
    // Check if user is accessing their own profile or is admin/librarian
    if (req.params.id !== req.user.id && !['admin', 'librarian'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized to access this profile' });
    }

    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private (own profile) or Admin
router.put('/:id', protect, async (req, res) => {
  try {
    // Check if user is updating their own profile or is admin
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const { name, avatar, readingGoal } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (readingGoal !== undefined) updateData.readingGoal = readingGoal;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// @route   PUT /api/users/:id/deactivate
// @desc    Deactivate user account
// @access  Private/Admin
router.put('/:id/deactivate', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User deactivated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deactivating user', error: error.message });
  }
});

export default router;
