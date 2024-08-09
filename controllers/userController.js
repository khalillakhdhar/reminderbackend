const User = require('../models/user');
const Reminder = require('../models/reminder');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'User was not saved '+error });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('reminders');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Users were not loaded' });
  }
};

// Get a user by ID
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('reminders');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'User was not loaded' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    ).populate('reminders');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'User was not updated' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Reminder.deleteMany({ user: user._id });
    res.status(200).json({ message: 'User and associated reminders deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'User was not deleted' });
  }
};
