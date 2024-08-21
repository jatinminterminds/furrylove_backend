'use strict';
const {
  Model
} = require('sequelize');
const post = require('./post');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class post_like extends Model {
    static associate(models) {
      post_like.belongsTo(models.post, { foreignKey: 'post_id', as: 'post' });
    }
  }
  post_like.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.BIGINT,
      references: {
        models: post,
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: user,
        key: 'id'
      }
    },
    is_like: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'post_like',
    underscored: true
  });
  return post_like;
};