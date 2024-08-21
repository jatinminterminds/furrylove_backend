'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chat.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    sender_id: {
      type: DataTypes.BIGINT
    },
    receiver_id: {
      type: DataTypes.BIGINT
    },
    message: {
      type: DataTypes.STRING
    },
    message_type: {
      type: DataTypes.STRING
    },
    is_read: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'chat',
    underscored: true
  });
  return chat;
};