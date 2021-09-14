
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'batman'},
        {username: 'gregolas'},
        {username: 'reijisan'},
        {username: 'takuchan'},
        {username: 'yukito'}
      ]);
      
    });
};
