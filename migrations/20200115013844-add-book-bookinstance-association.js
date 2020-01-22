'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'bookinstances', //name of the existing table
      'bookId', //row being added
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: {
          model: 'books',
          key: 'id',
        },
      }
    )
      .then(() => console.log('row added successfully'))
      .catch(err => console.log(err));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'bookinstances',
      'bookId'
    );
  }
};
