'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasOne(models.pet, { foreignKey: 'owner_id', as: 'pet' });
      user.hasMany(models.post, { foreignKey: 'user_id', as: 'posts' });
      user.hasMany(models.product, { foreignKey: 'user_id', as: 'products' });
      user.hasMany(models.story, { foreignKey: 'user_id', as: 'stories' });
      user.hasMany(models.story_view, { foreignKey: 'viewer_id', as: 'story_views' });
      user.hasMany(models.favourite, { foreignKey: 'user_id', as: 'favourite_posts' });
    }
  }
  user.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT
    },
    otp: {
      type: DataTypes.STRING
    },
    otp_expire: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'user',
    underscored: true
  });
  return user;
};
