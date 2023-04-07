const Model = require("../config/objection");
const Reactions = require("./reactionsModels");

class Users extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "first_name", "last_name", "email"],

      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 50 },
        first_name: { type: "string", minLength: 1, maxLength: 50 },
        last_name: { type: "string", minLength: 1, maxLength: 50 },
        email: { type: "string", minLength: 1, maxLength: 50 },
      },
    };
  }

  static get relationMappings() {
    const Posts = require("./postsModels");

    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Posts,
        join: {
          from: "users.id",
          to: "posts.user_id",
        },
      },
      reactions: {
        relation: Model.HasManyRelation,
        modelClass: Reactions,
        join: {
          from: "users.id",
          to: "reactions.user_id",
        },
      },
    };
  }
}

module.exports = Users;
