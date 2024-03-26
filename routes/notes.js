const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const NoteTag = require('../models/notetag');
const Tag = require('../models/tag')

Note.belongsToMany(Tag, { through: NoteTag });
Tag.belongsToMany(Note, { through: NoteTag });

router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: Tag
    });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao pesquisar notas.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id, {
      include: Tag
    });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar nota.' });
  }
});

router.post('/', async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const newNote = await Note.create({ title, description });
    if (tags && tags.length > 0) {
      const createNoteTag = tags.map(tag => ({ NoteId: id, TagId: tag }));
      await NoteTag.bulkCreate(createNoteTag);
    }
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar nota.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, tags } = req.body;
  try {
    await Note.update({ title, description }, { where: { id } });
    await NoteTag.destroy({ where: { noteId: id }})
    if (tags && tags.length > 0) {
      const createNoteTag = tags.map(tag => ({ NoteId: id, TagId: tag }));
      await NoteTag.bulkCreate(createNoteTag);
    }
    const note = await Note.findByPk(id, {
      include: Tag
    });
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao editar nota.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ message: 'Nota não encontrada.' });
    }
    await note.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar nota.' });
  }
});

module.exports = router;
