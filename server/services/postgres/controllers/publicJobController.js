const { Op } = require("sequelize");
const { Job, Company, User, Skill } = require("../models");

class PublicJobController {
  static async fetchAllJobs(req, res, next) {
    const { title } = req.query;
    let options = "";
    if (title) {
      options = title;
    }
    try {
      const jobs = await Job.findAll({
        where: {
          title: {
            [Op.iLike]: `%${options}%`,
          },
        },
        include: [
          {
            model: Company,
          },
          {
            model: Skill,
            order: [["createdAt", "ASC"]],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(jobs);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchJobById(req, res, next) {
    const { id } = req.params;

    try {
      const foundJob = await Job.findOne({
        where: { id },
        include: [
          {
            model: Company,
          },
          {
            model: Skill,
            order: [["createdAt", "ASC"]],
          },
        ],
      });

      res.status(200).json(foundJob);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = PublicJobController;
