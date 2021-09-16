exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users_in_workspaces")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users_in_workspaces").insert([
        { id: 1, userId: 1, workspaceId: 1 },
        { id: 2, userId: 1, workspaceId: 2 },
        { id: 3, userId: 2, workspaceId: 3 },
        { id: 4, userId: 3, workspaceId: 4 },
        { id: 5, userId: 4, workspaceId: 5 },
        { id: 6, userId: 5, workspaceId: 6 },
      ]);
    });
};