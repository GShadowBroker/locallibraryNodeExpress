'use strict';
module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    family_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_of_birth: DataTypes.DATEONLY,
    date_of_death: DataTypes.DATEONLY,

    //Virtual Fields:
    name: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING, ['first_name', 'family_name']),
      get: function(){
        return this.get('family_name') + ', ' + this.get('first_name');
      }
    },
    lifespan: {
      type: new DataTypes.VIRTUAL(DataTypes.INTEGER, ['date_of_birth', 'date_of_death']),
      get: function(){
        if (this.get('date_of_death') && this.get('date_of_birth')){
          return this.get('date_of_death').slice(0,4) - this.get('date_of_birth').slice(0,4);
        }
        return null;
      }
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function(){
        return "/authors/" + this.getDataValue('id');
      }
    }
  }, {});
  author.associate = function(models) {
    author.belongsToMany(models.book, {
      through: 'BookAuthor',
      as: 'books',
      foreignKey: 'authorId'
    });
  };
  return author;
};