'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 30],
        isNotEmail(val) {
          if (validator.isEmail(val)) {
            throw new Error('Only non-email usernames allowed')
          }
        }
      } },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      } 
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
  }},
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'updatedAt', 'email', 'createdAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      }, 
      loginUser: {
        attributes: {}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
