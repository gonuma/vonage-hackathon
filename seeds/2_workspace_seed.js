
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('workspaces').del()
    .then(function () {
      // Inserts seed entries
      return knex('workspaces').insert([
        {name: 'Test 1', userId: 1},
        {name: 'Test 2', userId: 1},
        {name: 'Test 3', userId: 2},
        {name: 'Test 4', userId: 3},
        {name: 'Test 5', userId: 4},
        {name: 'Test 6', userId: 5},
      ]);
      
    });
};
