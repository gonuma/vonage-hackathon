exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("files")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("files").insert([
        {
          id: 1,
          name: "Test File Please Ignore",
          srcstring: "presentation/d/1jg8FyX7Kz-J-K2OJ9c8fXcfMAhJ6xaEnjs_fWQ8HhO8",
          workspaceId: 1,
        },
        {
          id: 2,
          name: "What is this I don't even",
          srcstring: "spreadsheets/d/1TFHuNuRoDBOgONjvKp0G3z-zLoJjPwn9P9HGskLxsRU",
          workspaceId: 1,
        },
      ]);
    });
};
