'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
const post = require('./post');
module.exports = (sequelize, DataTypes) => {
  class saved_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  saved_post.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: user,
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.BIGINT,
      references: {
        model: post,
        key: 'id'
      }
    },
    is_saved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'saved_post',
    underscored: true
  });
  return saved_post;
};