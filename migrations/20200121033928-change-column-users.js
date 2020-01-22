'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    )
      .catch(err => console.log(err));
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn(
        'users',
        'email',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      );
  }
};
