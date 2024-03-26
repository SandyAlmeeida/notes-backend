const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');
const NoteTag = require('../models/notetag');
const Note = require('../models/note');

Note.belongsToMany(Tag, { through: NoteTag });
Tag.belongsToMany(Note, { through: NoteTag });

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Note
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error on search tags.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id, {
      include: Note
    });
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error on find tag.' });
  }
});

router.post('/', async (req, res) => {
  const { name, notes } = req.body;
  try {
    const newTag = await Tag.create({ name });
    if (notes && notes.length > 0) {
      const createNoteTag = notes.map(noteId => ({ tagId: id, noteId }));
      await NoteTag.bulkCreate(createNoteTag);
    }
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error on create tag.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, notes } = req.body;
  try {
    await Tag.update({ name }, { where: { id }, returning: true });
    await NoteTag.destroy({ where: { tagId: id }})
    if (notes && notes.length > 0) {
      const createNoteTag = notes.map(note => ({ TagId: id, NoteId: note }));
      await NoteTag.bulkCreate(createNoteTag);
    }
    const tag = await Tag.findByPk(id, {
      include: Note
    });
    res.status(200).json(tag);
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
