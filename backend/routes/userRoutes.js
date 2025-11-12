const express = require('express');
const router = express.Router();
const {
  getUsers,
  searchUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  exportToCSV
} = require('../controllers/userController');

// Get all users with pagination
router.get('/', getUsers);

// Search users
router.get('/search', searchUsers);

// Export to CSV
router.get('/export', exportToCSV);

// Get single user
router.get('/:id', getUserById);

// Create user
router.post('/', createUser);

// Update user
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router;

