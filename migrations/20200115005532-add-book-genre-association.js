'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'books', //name of the existing table
      'genreId', //row being added
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: {
          model: 'genres',
          key: 'id',
        },
      }
    )
      .then(() => console.log('row added successfully'))
      .catch(err => console.log(err));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'books',
      'genreId'
    );
  }
};
