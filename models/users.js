'use strict';
module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define('users', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		email: {
			type: DataTypes.STRING,
            allowNull: false,
            unique: true
		},
		username: {
			type: DataTypes.STRING,
            allowNull: false,
            unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
	}, {});
	users.associate = function(models) {
		// associations can be defined here
	};
	return users;
};