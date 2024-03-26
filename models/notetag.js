const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Note = require('./note');
const Tag = require('./tag');

const NoteTag = sequelize.define('NoteTag', {
  noteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tagId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = NoteTag;