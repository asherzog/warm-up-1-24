const knex = require('./knex.js');

module.exports = {
  getUserByEmail: function(email) {
    return knex("user")
            .where('email', email)
            .first();
  },
  createNewUser: function(user) {
    return knex("user")
            .insert(user, 'id')
            .then(ids => {
              return ids[0];
            });
  }
};
