const express = require('express');
const router = express.Router();
const {
  createReminder,
  getReminders,
  getRemindersByUser,
  updateReminder,
  deleteReminder
} = require('../controllers/reminderController');

router.post('/create', createReminder);
router.get('/', getReminders);
router.get('/user/:userId', getRemindersByUser);
router.put('/:id', updateReminder);
router.delete('/:id', deleteReminder);

module.exports = router;
