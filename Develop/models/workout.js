const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Workout extends Model {}

Workout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(20), // type: DataTypes.ENUM('Strength', 'Cardio', 'Yoga', 'Active Rest', 'High Intensity'),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duration: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    distance: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    intensity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exercise_list: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    heart_rate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    caloriesBurned: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "workout",
  }
);

module.exports = Workout;
