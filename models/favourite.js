'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
const product = require('./product');
const pet = require('./pet');
module.exports = (sequelize, DataTypes) => {
  class favourite extends Model {
    static associate(models) {
      favourite.belongsTo(models.user, { foreignKey: 'user_id', as: 'favourite_by' });
      favourite.belongsTo(models.product, { foreignKey: 'product_id', as: 'product' });
    }
  }
  favourite.init({
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
    pet_id: {
      type: DataTypes.BIGINT,
      references: {
        model: pet,
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.BIGINT,
      references: {
        model: product,
        key: 'id'
      }
    },
    is_favourite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'favourite',
    underscored: true
  });
  return favourite;
};