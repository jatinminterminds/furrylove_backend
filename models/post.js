'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate(models) {
      post.belongsTo(models.user, { foreignKey: 'user_id', as: 'posted_by' });
      post.hasMany(models.post_like, { foreignKey: 'post_id', as: 'post_likes' });
    }
  }
  post.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: user,
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.STRING
    },
    longitude: {
      type: DataTypes.STRING
    },
    images: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'post',
    underscored: true
  });
  return post;
};