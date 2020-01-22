'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookinstance = sequelize.define('bookinstance', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    imprint: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Available','Maintenance','Loaned','Reserved'],
      defaultValue: 'Maintenance',
      allowNull: false
    },
    due_back: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function(){
        return "/bookinstances/" + this.getDataValue('id');
      }
    }
  }, {});
  bookinstance.associate = function(models) {
    bookinstance.belongsTo(models.book);
  };
  return bookinstance;
};