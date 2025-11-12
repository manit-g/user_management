const User = require('../models/User');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const fs = require('fs');

// Get all users with pagination
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search users
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchRegex = new RegExp(query, 'i');
    const searchFilter = {
      $or: [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { address: searchRegex },
        { role: searchRegex }
      ]
    };

    const users = await User.find(searchFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(searchFilter);

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export to CSV
const exportToCSV = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    const csvWriter = createCsvWriter({
      path: 'users_export.csv',
      header: [
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Email' },
        { id: 'phone', title: 'Phone' },
        { id: 'address', title: 'Address' },
        { id: 'role', title: 'Role' },
        { id: 'createdAt', title: 'Created At' }
      ]
    });

    const csvData = users.map(user => ({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt.toISOString()
    }));

    await csvWriter.writeRecords(csvData);

    res.download('users_export.csv', 'users_export.csv', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ message: 'Error downloading file' });
      } else {
        // Clean up file after download
        fs.unlinkSync('users_export.csv');
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  searchUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  exportToCSV
};

