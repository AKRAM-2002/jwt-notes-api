const express = require('express');
const Note = require('../models/Note');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, user: req.userId });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Error creating note' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notes' });
  }
});

module.exports = router;