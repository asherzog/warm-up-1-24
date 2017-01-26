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
  },
  getAllCheese: function() {
    return knex('cheese');
  },
  createNewCheese: function(cheese) {
    return knex('cheese')
            .insert(cheese, 'id')
            .then(ids => {
              return ids[0];
            });
  },
  getCheeseById: function(id) {
    return knex('cheese')
            .where('id', id)
            .first();
  },
  updateCheese: function(id, cheese) {
    return knex('cheese')
            .where('id', id)
            .update(cheese, 'id');
  },
  deleteCheese: function(id) {
    return knex('cheese')
            .where('id', id)
            .del();
  }
};
