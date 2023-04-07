const Model = require("../config/objection");

class Reports extends Model {
  static get tableName() {
    return "reports";
  }

  static get idColumn() {
    return ["user_id", "post_id"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "post_id", "reason"],

      properties: {
        user_id: { type: "integer" },
        post_id: { type: "integer" },
        reason: { type: "string", minLength: 1, maxLength: 50 },
      },
    };
  }

  static get relationMappings() {
    const Users = require("./usersModels");
    const Posts = require("./postsModels");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: "users.id",
          to: "reports.user_id",
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Posts,
        join: {
          from: "posts.id",
          to: "reports.post_id",
        },
      },
    };
  }
}

module.exports = Reports;
