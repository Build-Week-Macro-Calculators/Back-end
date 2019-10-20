exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users
      .string("username", 128)
      .notNullable()
      .unique();

    users.string("password", 128).notNullable();
    users.integer("age").notNullable();
    users.float("height").notNullable();
    users.float("weight").notNullable();
    users.float("exerciseFrequency").notNullable();
    users.float("goal").notNullable();
    users.boolean("male").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
