const express = require("express");
const router = express.Router();

const controller = require("../controllers/reportsController");

router.get("/", controller.getAllReports);
router.get("/users", controller.getUserReporters);
router.get("/user-count", controller.getUserReporterCount);
router.get("/post-count", controller.getPostReporterCount);
router.get("/count", controller.getReportsCount);
router.get("/:id", controller.getReportById);
router.post("/", controller.createReport);
router.delete("/", controller.deleteReport);

module.exports = router;
