const express = require('express');
const router = express.Router();
const Income = require('../../models/Income');

// Get all income entries for the user
router.get('/', async (req, res) => {
  try {
    const income = await Income.find({ user: req.user.id });
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new income entry
router.post('/', async (req, res) => {
  try {
    const newIncome = new Income({
      ...req.body,
      user: req.user.id
    });
    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update income entry
router.put('/:id', async (req, res) => {
  try {
    const income = await Income.findOne({ _id: req.params.id, user: req.user.id });
    if (!income) {
      return res.status(404).json({ error: 'Income not found' });
    }
    
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.json(updatedIncome);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete income entry
router.delete('/:id', async (req, res) => {
  try {
    const income = await Income.findOne({ _id: req.params.id, user: req.user.id });
    if (!income) {
      return res.status(404).json({ error: 'Income not found' });
    }
    
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;