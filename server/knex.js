const knex = require("knex");
require("dotenv").config({ path: "../.env" });

const db = knex({
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.USER}@127.0.0.1:5432/collab`,
  migration: {
    directory: __dirname + "/migrations",
  },
  searchPath: "public",
});

module.exports = db;
