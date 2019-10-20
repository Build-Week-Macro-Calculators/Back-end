const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update
};

function find() {
  return db("users").select("*");
}

function findBy(filter) {
  return db("users").where(filter);
}

function update() {}

function findById() {}

async function add(user) {
  const newUser = await db("users").insert(user);
}
