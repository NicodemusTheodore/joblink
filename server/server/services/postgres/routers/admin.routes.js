const express = require("express");
const JobController = require("../controllers/jobController");
const CompanyController = require("../controllers/companyController");
const router = express.Router();

// JOB ROUTES
router.get("/job", JobController.fetchAllJobs);
router.post("/job", JobController.addNewJob);
router.get("/job/:id", JobController.fetchJobById);
router.put("/job/:id", JobController.editJob);
router.delete("/job/:id", JobController.deleteJob);

// COMPANY ROUTES
router.get("/company", CompanyController.fetchAllCompanies);
router.post("/company", CompanyController.addCompany);
router.get("/company/:id", CompanyController.fetchCompanyById);
router.put("/company/:id", CompanyController.editCompany);
router.delete("/company/:id", CompanyController.deleteCompany);

module.exports = router;
