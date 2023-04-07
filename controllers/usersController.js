const Users = require("../models/usersModels");

//router.get("/", controller.getAllUsers); // with post and react ?
//router.get("/", controller.getUserById); // with post and react ?

exports.getAllUsers = async (_req, res, next) => {
  try {
    const users = await Users.query()
      .withGraphFetched("posts", "reactions")
      .limit(100);

    res.status(200).json({
      success: true,
      data: {
        users: users,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsersCount = async (_req, res, next) => {
  try {
    const count = await Users.query().count("* as count").first();

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

exports.getUserById = async (req, res, next) => {
  try {
    const user = await Users.query().findById(req.params.id);

    res.status(200).json({
      success: true,
      data: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};
