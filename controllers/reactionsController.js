const Posts = require("../models/postsModels");
const Reactions = require("../models/reactionsModels");
const Users = require("../models/usersModels");

// router.get("/", controller.getAllReactions);
// router.get("/:id", controller.getReactionById);
// router.post("/", controller.createReactions);

exports.getAllReactions = async (_req, res, next) => {
  try {
    const reaction = await Reactions.query().limit(100);

    res.status(200).json({
      success: true,
      data: {
        reaction: reaction,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getReactionsCount = async (_req, res, next) => {
  try {
    const count = await Reactions.query().count("* as count").first();

    res.status(200).json({
      success: true,
      data: {
        count,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getReactionById = async (req, res, next) => {
  try {
    const reaction = await Reactions.query().findById(req.params.id);

    res.status(200).json({
      success: true,
      data: {
        reaction: reaction,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createReaction = async (req, res, next) => {
  try {
    const { user_id, post_id, type } = req.body;

    const user = await Users.query().findById(user_id);
    if (!user) {
      throw new Error(`User does not exist`);
    }

    const post = await Posts.query().findById(post_id);
    if (!post) {
      throw new Error(`Post does not exist`);
    }
    const reaction = await Reactions.query().insert({
      user_id: user_id,
      post_id: post_id,
      type: type,
    });

    res.status(200).json({
      success: true,
      data: {
        reaction: reaction,
      },
    });
  } catch (error) {
    next(error);
  }
};
