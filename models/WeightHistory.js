const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class WeightHistory extends Model {}

WeightHistory.init(
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
        model: "user",
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    bmi: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "weighthistory",
  }
);

module.exports = WeightHistory;

//hello world