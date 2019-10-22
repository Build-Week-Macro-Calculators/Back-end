exports.up = function(knex) {
  return knex.schema.createTable("userWeight", tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.float("weight").notNullable();
    tbl.date("date").notNullable();
  });
};

exports.down = function(knex) {};
