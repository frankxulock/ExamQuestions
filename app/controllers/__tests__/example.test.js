const request = require("supertest");
const app = require("../../../app");

describe("測試 Example API", () => {
  it("should test example api", async () => {
    const res = await request(app).get("/example");
    expect(res.body.message).toBe('hello world');
    return Promise.resolve();
  });
});
