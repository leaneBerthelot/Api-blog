const { Model } = require("objection");
const Knex = require("knex");

const knex = Knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "bog",
  },
});

Model.knex(knex);

module.exports = Model;
