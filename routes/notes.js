const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error on search notes.' });
  }
});

router.post('/', async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const newNote = await Note.create({ title, description });
    if (tags && tags.length > 0) {
      await newNote.setTags(tags);
    }
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error on create note.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, tags } = req.body;
  try {
    const newNote = await Note.update({ title, description }, { where: {id} });
    if (tags && tags.length > 0) {
      await newNote.setTags(tags);
    }
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error on create note.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }
    await note.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error on delete note.' });
  }
});

module.exports = router;
