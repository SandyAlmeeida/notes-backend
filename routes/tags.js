const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');
const NoteTag = require('../models/notetag');
const Note = require('../models/note');

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error on search tags.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id);
    const noteTags = await NoteTag.findAll( {where: { tagId: id } });
    const notesIds = noteTags.map((note) => note.noteId)
    const notes = await Note.findAll( {where: { id: notesIds } });
    tag.dataValues.notes = notes;
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error on find tag.' });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newTag = await Tag.create({ name });
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error on create tag.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const newTag = await Tag.update({ name }, { where: {id} });
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error on create tag.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found.' });
    }
    await tag.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error on delete tag.' });
  }
});

module.exports = router;
