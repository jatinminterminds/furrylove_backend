'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class story extends Model {
    static associate(models) {
      story.belongsTo(models.user, { foreignKey: 'user_id', as: 'uploaded_by' });
      story.hasMany(models.story_view, { foreignKey: 'story_id', as: 'story_views' });
    }
  }
  story.init({
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
    content: {
      type: DataTypes.TEXT
    },
    text: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'story',
    underscored: true
  });
  return story;
};