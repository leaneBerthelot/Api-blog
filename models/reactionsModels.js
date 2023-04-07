const Model = require("../config/objection");

class Reactions extends Model {
  static get tableName() {
    return "reactions";
  }

  static get idColumn() {
    return ["user_id", "post_id"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "post_id", "type"],

      properties: {
        user_id: { type: "integer" },
        post_id: { type: "integer" },
        type: { type: "string", minLength: 1, maxLength: 50 },
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
          from: "reactions.user_id",
          to: "users.id",
        },
      },
      posts: {
        relation: Model.BelongsToOneRelation,
        modelClass: Posts,
        join: {
          from: "reactions.post_id",
          to: "posts.id",
        },
      },
    };
  }
}

module.exports = Reactions;
