'use strict';
module.exports = (sequelize, DataTypes) => {
  const BookAuthor = sequelize.define('BookAuthor', {
    bookId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'books',
            key: 'id'
        }
    },
    authorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'authors',
            key: 'id'
        }
    }

  }, {});
  BookAuthor.associate = function(models) {
    //
  };
  return BookAuthor;
};