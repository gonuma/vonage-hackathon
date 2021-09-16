exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("users", (table) => {
      table.increments("id", { primaryKey: true });
      table.string("username").notNullable();
    }),

    knex.schema.createTable("workspaces", (table) => {
      table.increments("id", { primaryKey: true });
      table.string("name").notNullable();
      table.string("sessionId");
    }),

    knex.schema.createTable("users_in_workspaces", (table) => {
      table.increments("id", { primaryKey: true });
      table.integer("userId", { deferrable: "deferred" }).unsigned();
      table.integer("workspaceId", { deferrable: "deferred" }).unsigned();

      table.foreign("userId").references("users.id").onDelete("CASCADE");
      table
        .foreign("workspaceId")
        .references("workspaces.id")
        .onDelete("CASCADE");
    }),

    knex.schema.createTable("files", (table) => {
      table.increments("id", { primaryKey: true });
      table.string("srcstring").notNullable();
      table.string("name").notNullable();
      table
        .integer("workspaceId")
        .references("workspaces.id")
        .onDelete("CASCADE");
    }),
  ]);
};

exports.down = function (knex) {};
