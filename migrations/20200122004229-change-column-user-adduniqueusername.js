'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'users',
      'username',
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
        'username',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      );
  }
};
