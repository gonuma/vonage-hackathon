
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'batman'},
        {id: 2, username: 'gregolas'},
        {id: 3, username: 'reijisan'},
        {id: 4, username: 'takuchan'},
        {id: 5, username: 'yukito'}
      ]);
      
    });
};
