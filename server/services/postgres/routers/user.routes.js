const express = require("express");
const PublicJobController = require("../controllers/publicJobController");
const router = express.Router();

router.get("/pub/jobs", PublicJobController.fetchAllJobs);
router.get("/pub/jobs/:id", PublicJobController.fetchJobById);

module.exports = router;
