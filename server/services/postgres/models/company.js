"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.Job, { foreignKey: "companyId" });
    }
  }
  Company.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company name is required",
          },
          notEmpty: {
            msg: "Company name is required",
          },
        },
      },
      companyLogo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company logo is required",
          },
          notEmpty: {
            msg: "Company logo is required",
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company location is required",
          },
          notEmpty: {
            msg: "Company location is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company email is required",
          },
          notEmpty: {
            msg: "Company email is required",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company description is required",
          },
          notEmpty: {
            msg: "Company description is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
