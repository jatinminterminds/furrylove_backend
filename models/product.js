'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      product.belongsTo(models.user, { foreignKey: 'user_id', as: 'created_by' });
    }
  }
  product.init({
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
    brand: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING
    },
    product_condition: {
      type: DataTypes.STRING
    },
    product_title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    item_price: {
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
    modelName: 'product',
    underscored: true
  });
  return product;
};