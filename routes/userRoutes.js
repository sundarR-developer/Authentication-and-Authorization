const express = require('express');
const router = express.Router();

// Import controllers
const {
  getUserProfile,
  getAllUsers,
  getUserById,
  updateUserProfile,
  deleteUserAccount,
  deactivateAccount
} = require('../controllers/userController');

// Import middleware
const { protect, authorize } = require('../middleware/auth');
const { updateDetailsValidation } = require('../middleware/validate');

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', protect, getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', protect, updateDetailsValidation, updateUserProfile);

/**
 * @route   DELETE /api/users/profile
 * @desc    Delete user account
 * @access  Private
 */
router.delete('/profile', protect, deleteUserAccount);

/**
 * @route   PATCH /api/users/profile/deactivate
 * @desc    Deactivate user account
 * @access  Private
 */
router.patch('/profile/deactivate', protect, deactivateAccount);

// Admin only routes
/**
 * @route   GET /api/users
 * @desc    Get all users (Admin only)
 * @access  Private/Admin
 */
router.get('/', protect, authorize('admin'), getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID (Admin only)
 * @access  Private/Admin
 */
router.get('/:id', protect, authorize('admin'), getUserById);

module.exports = router; 