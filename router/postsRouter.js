const express = require("express");
const router = express.Router();

const controller = require("../controllers/postsController");

router.get("/", controller.getAllPosts);
router.get("/count", controller.getPostsCount);
router.get("/:id", controller.getPostById);
router.post("/", controller.createPost);
router.patch("/:id", controller.updatePost);

module.exports = router;
