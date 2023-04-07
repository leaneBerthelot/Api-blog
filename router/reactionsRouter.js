const express = require("express");
const router = express.Router();

const controller = require("../controllers/reactionsController");

router.get("/", controller.getAllReactions);
router.get("/count", controller.getReactionsCount);
router.get("/:id", controller.getReactionById);
router.post("/", controller.createReaction);

module.exports = router;
