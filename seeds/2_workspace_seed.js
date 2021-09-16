exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("workspaces")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("workspaces").insert([
        {
          id: 1,
          name: "Test 1",
          sessionId: null,
        },
        { id: 2, name: "Test 2", sessionId: null },
        { id: 3, name: "Test 3", sessionId: null },
        { id: 4, name: "Test 4", sessionId: null },
        { id: 5, name: "Test 5", sessionId: null },
        { id: 6, name: "Test 6", sessionId: null },
      ]);
    });
};
