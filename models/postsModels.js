const Model = require("../config/objection");

class Posts extends Model {
  static get tableName() {
    return "posts";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["content", "user_id"],
      properties: {
        id: { type: "integer" },
        content: { type: "string", minLength: 1, maxLength: 250 },
        user_id: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const Users = require("./usersModels");
    const Reactions = require("./reactionsModels");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: "user.id",
          to: "users.user_id",
        },
      },
      reactions: {
        relation: Model.HasManyRelation,
        modelClass: Reactions,
        join: {
          from: "posts.id",
          to: "reactions.post_id",
        },
      },
    };
  }
}

module.exports = Posts;
