const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Note.associate = models => {
  Note.belongsToMany(models.Tag, { through: 'NoteTag' });
};

module.exports = Note;
