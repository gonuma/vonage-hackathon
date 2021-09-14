exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("files")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("files").insert([
        {
          srcstring: "1jg8FyX7Kz-J-K2OJ9c8fXcfMAhJ6xaEnjs_fWQ8HhO8",
          workspaceId: 1,
        },
        {
          srcstring: "1TFHuNuRoDBOgONjvKp0G3z-zLoJjPwn9P9HGskLxsRU",
          workspaceId: 1,
        },
      ]);
    });
};
