const { Company, sequelize } = require("../models");

class CompanyController {
  static async fetchAllCompanies(req, res, next) {
    try {
      const companies = await Company.findAll();

      res.status(200).json(companies);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchCompanyById(req, res, next) {
    const { id } = req.params;
    try {
      const company = await Company.findOne({ where: { id } });

      res.status(200).json(company);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addCompany(req, res, next) {
    const { name, companyLogo, location, email, description } = req.body;
    try {
      await Company.create({ name, companyLogo, location, email, description });

      res.status(201).json({
        message: "Company successfully added",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editCompany(req, res, next) {
    const { id } = req.params;
    const { name, companyLogo, location, email, description } = req.body;

    try {
      await Company.update(
        {
          name: name,
          companyLogo: companyLogo,
          location: location,
          email: email,
          description: description,
        },
        { where: { id } }
      );

      res.status(200).json({
        message: "Company successfully updated",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteCompany(req, res, next) {
    const { id } = req.params;
    try {
      await Company.destroy({ where: { id } });
      res.status(200).json({
        message: "Company successfully deleted",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CompanyController;
