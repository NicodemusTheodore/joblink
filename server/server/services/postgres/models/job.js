"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Job.hasMany(models.Skill, { foreignKey: "jobId" });
      Job.belongsTo(models.Company, { foreignKey: "companyId" });
    }
  }
  Job.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Job Title is required",
          },
          notEmpty: {
            msg: "Job Title is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Job Description is required",
          },
          notEmpty: {
            msg: "Job Description is required",
          },
        },
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company is required",
          },
          notEmpty: {
            msg: "Company is required",
          },
        },
      },
      authorId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Job Type is required",
          },
          notEmpty: {
            msg: "Job Type is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
