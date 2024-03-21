// models/tag.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tag = sequelize.define('Tag', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Tag.associate = models => {
  Tag.belongsToMany(models.Note, { through: 'NoteTag' });
};

module.exports = Tag;
