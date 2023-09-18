const request = require("supertest");

const baseUrl = "http://127.0.0.1:3300/api/heroes";

describe("routes", function () {
  beforeAll(() => {
    console.log("Start testing routes");
  });

  let id;
  const exampleNewHero = {
    nickname: "Example",
    real_name: "Bruce Wayne",
    origin_description:
      "Bruce Wayne witnessed the murder of his parents, Thomas and Martha Wayne, as a child, which led him to vow to avenge their deaths by fighting crime.",
    superpowers:
      "Peak human physical condition, stealth and espionage expertise, Master of disguise",
    catch_phrase: "I'm Batman!",
    images: [
      "https://images.pexels.com/photos/15511010/pexels-photo-15511010/free-photo-of-man-in-batman-costume-at-night.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  };
  const exampleUpdate = {
    nickname: "Batman",
  };

  test("GET / should return a list of heroes", async () => {
    const res = await request(baseUrl).get("/").query({ page: 1, limit: 2 });

    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST / should return a succesfull message and result with new hero _id", async () => {
    const res = await request(baseUrl).post("/").send(exampleNewHero);

    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.message).toBe("Hero added to DB!");

    id = res.body.result["_id"];
  });

  test("GET /:id should return a just created hero", async () => {
    const res = await request(baseUrl).get(`/${id}`);

    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(typeof res.body).toBe("object");
  });

  test("PATCH /:id should return a succesfull message and update just created hero", async () => {
    const res = await request(baseUrl).patch(`/${id}`).send(exampleUpdate);

    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.message).toBe(
      "Info about a superhero was successfully updated in DB!"
    );
  });

  test("DELETE /:id should return a status 204 only and delete just created hero", async () => {
    const res = await request(baseUrl).delete(`/${id}`);

    expect(res.status).toBe(204);
  });
});
