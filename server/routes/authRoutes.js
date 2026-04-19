const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, logout, getMe } = require('../controllers/authController');
const isAuth = require('../middleware/authMiddleware');

// Validation rules
const registerValidation = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Enter a valid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').trim()
];

const loginValidation = [
  body('email').isEmail().withMessage('Enter a valid email').normalizeEmail(),
  body('password').trim().notEmpty().withMessage('Password is required')
];

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', logout);

// Protected routes test
router.get('/me', isAuth, getMe);

module.exports = router;
