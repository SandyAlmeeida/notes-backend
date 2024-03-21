const Sequelize = require('sequelize');
const sequelize = new Sequelize('database_development', 'local', 'local', {dialect: 'mysql', host: 'localhost'});
 
module.exports = sequelize;