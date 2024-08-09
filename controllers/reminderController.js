const Reminder = require('../models/reminder');
const User = require('../models/user');

// Create a new reminder
exports.createReminder = async (req, res) => {
  try {
    const { title, description, date, userid } = req.body;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    const remind = new Reminder({
      title,
      description,
      date,
      user: userid
    });
    const saved = await remind.save();
    user.reminders.push(saved._id);
    await user.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Reminder was not saved" });
  }
};

// Get all reminders
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find().populate('user', 'name email');
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: "Reminder was not loaded" });
  }
};

// Get reminders by user ID
exports.getRemindersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reminders = await Reminder.find({ user: userId }).populate('user', 'name email');
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: "Reminders were not loaded" });
  }
};

// Update a reminder
exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;
    const updatedReminder = await Reminder.findByIdAndUpdate(
      id,
      { title, description, date },
      { new: true }
    ).populate('user', 'name email');
    if (!updatedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    res.status(200).json(updatedReminder);
  } catch (error) {
    res.status(500).json({ message: "Reminder was not updated" });
  }
};

// Delete a reminder
exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const remind = await Reminder.findByIdAndDelete(id);
    if (!remind) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    const user = await User.findById(remind.user);
    user.reminders.pull(remind._id);
    await user.save();
    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Reminder was not deleted" });
  }
};
