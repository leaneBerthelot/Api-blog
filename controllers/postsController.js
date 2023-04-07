const Posts = require("../models/postsModels");
const Users = require("../models/usersModels");

// router.get("/", controller.getAllPosts); // avec leurs réactions;
// router.get("/:id", controller.getPostById);
// router.post("/", controller.createPost);
// router.patch("/:id", controller.updatePost); // verifier que user.id de body = user.id de post

exports.getAllPosts = async (_req, res, next) => {
  try {
    const posts = await Posts.query().withGraphFetched("reactions").limit(100);

    res.status(200).json({
      success: true,
      data: {
        posts: posts,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getPostsCount = async (_req, res, next) => {
  try {
    const count = await Posts.query().count("* as count").first();

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

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Posts.query().findById(req.params.id);

    res.status(200).json({
      success: true,
      data: {
        post: post,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { content, user_id } = req.body;

    const user = await Users.query().findById(user_id);
    if (!user) {
      throw new Error(`User does not exist`);
    }

    const post = await Posts.query().insert({
      content: content,
      user_id: user_id,
    });

    res.status(200).json({
      success: true,
      data: {
        post: post,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { content, user_id } = req.body;

    const post = await Posts.query().findById(req.params.id);
    if (user_id !== post.user_id) {
      throw new Error(`User is not owner of the post`);
    }

    const newpost = await Posts.query().patchAndFetchById(req.params.id, {
      content: content,
      user_id: user_id,
    });

    res.status(200).json({
      success: true,
      data: {
        post: newpost,
      },
    });
  } catch (error) {
    next(error);
  }
};
