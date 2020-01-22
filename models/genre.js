'use strict';
module.exports = (sequelize, DataTypes) => {
  const genre = sequelize.define('genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  genre.associate = function(models) {
    genre.hasMany(models.book);
  };
  return genre;
};