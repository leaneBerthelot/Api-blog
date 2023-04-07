const express = require("express");
const router = express.Router();

const controller = require("../controllers/usersController");

router.get("/", controller.getAllUsers);
router.get("/count", controller.getUsersCount);
router.get("/:id", controller.getUserById);

module.exports = router;
