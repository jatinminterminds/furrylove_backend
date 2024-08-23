'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
const pet = require('./pet');
module.exports = (sequelize, DataTypes) => {
  class selected_pet extends Model {
    static associate(models) {
      selected_pet.belongsTo(models.pet, { foreignKey: 'pet_id', as: 'pet' });
    }
  }
  selected_pet.init({
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
    pet_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: pet,
        key: 'id'
      }
    },
    is_selected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'selected_pet',
    underscored: true
  });
  return selected_pet;
};