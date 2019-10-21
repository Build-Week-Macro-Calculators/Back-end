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

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(count => {
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}
