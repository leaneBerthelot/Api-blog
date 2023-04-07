const Reports = require("../models/reportsModels");
const Posts = require("../models/postsModels");
const Users = require("../models/usersModels");

// router.get("/", controller.getAllReports);
// router.get("/:id", controller.getReportById);
// router.post("/", controller.createReports);

exports.getAllReports = async (_req, res, next) => {
  try {
    const report = await Reports.query();

    res.status(200).json({
      success: true,
      data: {
        report: report,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserReporters = async (_req, res, next) => {
  try {
    const reports = await Reports.query().withGraphFetched("user");

    res.status(200).json({
      success: true,
      data: {
        reports: reports,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getReportById = async (req, res, next) => {
  try {
    const report = await Reports.query().findById(req.params.id);

    res.status(200).json({
      success: true,
      data: {
        report: report,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createReport = async (req, res, next) => {
  try {
    const { user_id, post_id, reason } = req.body;

    const user = await Users.query().findById(user_id);
    if (!user) {
      throw new Error(`User does not exist`);
    }

    const post = await Posts.query().findById(post_id);
    if (!post) {
      throw new Error(`Post does not exist`);
    }

    const report = await Reports.query().insert({
      user_id: user_id,
      post_id: post_id,
      reason: reason,
    });

    res.status(200).json({
      success: true,
      data: {
        report: report,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserReporterCount = async (req, res, next) => {
  try {
    const count = await Reports.query()
      .countDistinct("user_id as count")
      .first();

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

exports.getPostReporterCount = async (req, res, next) => {
  try {
    const count = await Reports.query()
      .countDistinct("post_id as count")
      .first();

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

exports.getReportsCount = async (req, res, next) => {
  try {
    const count = await Reports.query().count("* as count").first();

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

exports.deleteReport = async (req, res, next) => {
  try {
    const { user_id, post_id } = req.body;

    const report = await Reports.query()
      .delete()
      .whereComposite(["post_id", "user_id"], [post_id, user_id]);

    res.status(200).json({
      success: true,
      data: {
        report: report,
      },
    });
  } catch (error) {
    next(error);
  }
};
