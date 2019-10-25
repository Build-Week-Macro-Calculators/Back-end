const request = require("supertest");
const db = require("../data/dbConfig");
const Users = require("../users/users-model");
const server = require("../api/server");

describe("auth-router", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("register", () => {
    it("should respond with 201 with valid request", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({
          username: "roadDawg6",
          password: "abcd",
          height: 72,
          weight: 125,
          age: 27,
          exerciseFrequency: 1.5,
          male: false,
          goal: -0.15
        })
        .expect(201);
    });
  });

  describe("login", () => {
    it("should repsond with 401 on incorrect username", async () => {
      await Users.add({
        username: "hankhill",
        password: "ladybird123",
        height: 72,
        weight: 125,
        age: 27,
        exerciseFrequency: 1.5,
        male: false,
        goal: -0.15
      });

      await request(server)
        .post("/api/auth/login")
        .send({ username: "bobbyhill", password: "ladybird123" })
        .expect(401);
    });

    it("should respond with 401 on incorrect password", async () => {
      await Users.add({
        username: "test4",
        password: "tests",
        height: 72,
        weight: 125,
        age: 27,
        exerciseFrequency: 1.5,
        male: false,
        goal: -0.15
      });

      await request(server)
        .post("/api/auth/login")
        .send({ username: "test4", password: "testes" })
        .expect(401);
    });
  });
});
