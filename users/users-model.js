const db = require("../data/dbConfig");
const moment = require("moment");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  findUserWeights,
  addWeight,
  findAllWeights
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
  const [id] = await db("users").insert(user, "id");
  const userData = {
    user_id: id,
    weight: user.weight,
    date: moment().format("LLL")
  };
  const addWeight = await db("userWeight").insert(userData, "id");
  return findById(id);
}

function findUserWeights(id) {
  return db("userWeight").where({ user_id: id });
}

async function addWeight(userData) {
  const [id] = await db("userWeight").insert(userData, "id");
}

function findAllWeights() {
  return db("userWeight").select("*");
}

async function editWeight(id, weight) {
  const edit = db("users")
    .where({ id })
    .update(weight)
    .then(count => {
      return findById(id);
    });
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
