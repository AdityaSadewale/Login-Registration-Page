const express = require('express');
const router = express.Router();
const { register, login, refresh, logout } = require('../controllers/authController');
const isAuth = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

// Protected routes test
router.get('/me', isAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
