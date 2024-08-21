'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class pet extends Model {
    static associate(models) {
      pet.belongsTo(models.user, { foreignKey: 'owner_id', as: 'owner' });
      pet.hasMany(models.rejected_pet, { foreignKey: 'pet_id', as: 'rejections' });
    }
  }
  pet.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    owner_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: user,
        key: 'id'
      }
    },
    pet_name: {
      type: DataTypes.STRING
    },
    pet_category: {
      type: DataTypes.STRING
    },
    breed: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.STRING
    },
    images: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'pet',
    underscored: true
  });
  return pet;
};