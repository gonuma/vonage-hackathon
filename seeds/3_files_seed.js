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
          srcstring: "https://docs.google.com/presentation/d/1jg8FyX7Kz-J-K2OJ9c8fXcfMAhJ6xaEnjs_fWQ8HhO8/edit?usp=sharing",
          workspaceId: 1,
        },
        {
          id: 2,
          name: "Is this a spreadsheet?",
          srcstring: "https://docs.google.com/spreadsheets/d/1TFHuNuRoDBOgONjvKp0G3z-zLoJjPwn9P9HGskLxsRU/edit?usp=sharing",
          workspaceId: 1,
        },
        {
          id: 3,
          name: "Doc",
          srcstring: "https://docs.google.com/spreadsheets/d/1TFHuNuRoDBOgONjvKp0G3z-zLoJjPwn9P9HGskLxsRU/edit?usp=sharing",
          workspaceId: 2,
        },
        {
          id: 4,
          name: "Doc",
          srcstring: "https://docs.google.com/spreadsheets/d/1TFHuNuRoDBOgONjvKp0G3z-zLoJjPwn9P9HGskLxsRU/edit?usp=sharing",
          workspaceId: 3,
        },
      ]);
    });
};
