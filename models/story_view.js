'use strict';
const {
  Model
} = require('sequelize');
const story = require('./story');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class story_view extends Model {
    static associate(models) {
      story_view.belongsTo(models.story, { foreignKey: 'story_id', as: 'story' });
      story_view.belongsTo(models.user, { foreignKey: 'viewer_id', as: 'viewer' });
    }
  }
  story_view.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    story_id: {
      type: DataTypes.BIGINT,
      references: {
        model: story,
        key: 'id'
      }
    },
    viewer_id: {
      type: DataTypes.BIGINT,
      references: {
        model: user,
        key: 'id'
      }
    },
    is_like: {
      type: DataTypes.TINYINT,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'story_view',
    underscored: true
  });
  return story_view;
};