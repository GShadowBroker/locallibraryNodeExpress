'use strict';
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function(){
        return "/books/" + this.getDataValue('id');
      }
    }
  }, {});
  book.associate = function(models) {
    book.belongsTo(models.genre);
    book.hasMany(models.bookinstance);
    book.belongsToMany(models.author, {
      through: 'BookAuthor',
      as: 'authors',
      foreignKey: 'bookId'
    });
  };
  return book;
};