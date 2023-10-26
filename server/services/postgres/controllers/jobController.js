const { Job, Company, Skill, sequelize } = require("../models");

class JobController {
  static async fetchAllJobs(req, res, next) {
    try {
      const jobs = await Job.findAll({
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
      const job = await Job.findOne({
        where: {
          id,
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
      });
      res.status(200).json(job);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async addNewJob(req, res, next) {
    const { title, description, companyId, authorId, jobType, skills } =
      req.body;
    const t = await sequelize.transaction();
    try {
      const createdJob = await Job.create(
        {
          title,
          description,
          companyId,
          authorId,
          jobType,
        },
        { transaction: t }
      );

      skills.forEach((skill) => {
        skill["jobId"] = createdJob.id;
      });

      await Skill.bulkCreate([...skills], { transaction: t });

      await t.commit();

      res.status(201).json({
        message: "Job successfully added",
      });
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }
  static async editJob(req, res, next) {
    const { id } = req.params;
    const { title, description, companyId, authorId, jobType, skills } =
      req.body;
    const t = await sequelize.transaction();
    try {
      await Job.update(
        {
          title,
          description,
          companyId,
          authorId,
          jobType,
        },
        {
          where: {
            id,
          },
          transaction: t,
        }
      );

      const foundSkills = await Skill.findAll({
        where: { jobId: id },
        transaction: t,
      });
      const skillIds = foundSkills.map((skill) => skill.id);
      const newSkillsName = skills.map((skill) => skill.name);
      const newSkillsLevel = skills.map((skill) => skill.level);

      await Skill.update(
        { name: newSkillsName[0], level: newSkillsLevel[0] },
        { where: { id: skillIds[0] }, transaction: t }
      );

      await Skill.update(
        { name: newSkillsName[1], level: newSkillsLevel[1] },
        { where: { id: skillIds[1] }, transaction: t }
      );

      await Skill.update(
        { name: newSkillsName[2], level: newSkillsLevel[2] },
        { where: { id: skillIds[2] }, transaction: t }
      );

      await t.commit();

      res.status(200).json({
        message: "Job successfully updated",
      });
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  static async deleteJob(req, res, next) {
    const { id } = req.params;
    try {
      await Job.destroy({ where: { id } });
      res.status(200).json({
        message: "Job successfully deleted",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = JobController;
