const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @desc    Protect routes - Verify JWT token
 * @access  Private
 */
exports.protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not logged in. Please log in to get access.'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'error',
        message: 'The user belonging to this token no longer exists.'
      });
    }

    // Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: 'error',
        message: 'User recently changed password! Please log in again.'
      });
    }

    // Check if user is active
    if (!currentUser.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Grant access to protected route
    req.user = currentUser;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token. Please log in again.'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired. Please log in again.'
      });
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized to access this route.'
      });
    }
  }
};

/**
 * @desc    Grant access to specific roles
 * @access  Private
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: `User role '${req.user.role}' is not authorized to access this route.`
      });
    }
    next();
  };
};

/**
 * @desc    Optional authentication - doesn't fail if no token
 * @access  Public
 */
exports.optionalAuth = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, continue without authentication
  if (!token) {
    return next();
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next();
    }

    // Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }

    // Check if user is active
    if (!currentUser.isActive) {
      return next();
    }

    // Grant access to protected route
    req.user = currentUser;
    next();

  } catch (error) {
    // If token is invalid, continue without authentication
    next();
  }
}; 