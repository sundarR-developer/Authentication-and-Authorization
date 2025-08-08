const express = require('express');
const router = express.Router();

// Import controllers
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword
} = require('../controllers/authController');

// Import middleware
const { protect } = require('../middleware/auth');
const {
  registerValidation,
  loginValidation,
  updateDetailsValidation,
  updatePasswordValidation
} = require('../middleware/validate');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerValidation, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', loginValidation, login);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', protect, logout);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get('/me', protect, getMe);

/**
 * @route   PUT /api/auth/updatedetails
 * @desc    Update user details
 * @access  Private
 */
router.put('/updatedetails', protect, updateDetailsValidation, updateDetails);

/**
 * @route   PUT /api/auth/updatepassword
 * @desc    Update password
 * @access  Private
 */
router.put('/updatepassword', protect, updatePasswordValidation, updatePassword);

module.exports = router; 