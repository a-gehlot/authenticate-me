'use strict';
const bcrypt = require('bcryptjs')
const validator = require('validator')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    toSafeObject() {
      const { id, username, email } = this;
      return { id, username, email }
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id)
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id)
      }
    }

    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
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
      } 
    },
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
    sequelize,
    modelName: "User",
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
  }
  );
  
  return User;
};
