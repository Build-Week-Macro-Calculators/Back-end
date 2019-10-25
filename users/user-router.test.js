const request = require("supertest");
const server = require("../api/server");

describe("user-router", () => {
  describe("user route", () => {
    it("responds with 400 if no token", () => {
      return request(server)
        .get("/api/users")
        .expect(401);
    });
  });
});
