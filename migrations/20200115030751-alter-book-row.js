'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'books',
      'summary',
      {
        type: Sequelize.TEXT,
        allowNull: false
      }
    )
      .catch(err => console.log(err));
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn(
        'books',
        'summary',
        {
          type: Sequelize.TEXT,
          allowNull: false
        }
      )
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
