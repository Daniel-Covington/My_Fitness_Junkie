const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserDetail extends Model {}

UserDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'user',
        key: 'id',
      },
    },
    weight: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false,
    },
    height: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false,
    },
    bmi: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true, 
    },
    goal_weight: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true, 
    },
    activity_level: {
      type: DataTypes.ENUM('low', 'moderate', 'high'), 
      allowNull: true, 
    },
    fitness_goal: {
      type: DataTypes.TEXT, 
      allowNull: true, 
    },
    dietary_preference: {
      type: DataTypes.TEXT, 
      allowNull: true, 
    },
    resting_heart_rate: {
      type: DataTypes.INTEGER, 
      allowNull: true, 
    },
    blood_pressure: {
      type: DataTypes.STRING, 
      allowNull: true, 
    },
    sleep_data: {
      type: DataTypes.JSON, 
      allowNull: true, 
    },
    body_measurements: {
      type: DataTypes.JSON, 
      allowNull: true, 
    },
  },
  {
    sequelize,
    timestamps: true, 
    freezeTableName: true,
    underscored: true,
    modelName: 'user_detail',
  }
);

module.exports = UserDetail; 