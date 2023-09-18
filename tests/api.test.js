const request = require("supertest");

const baseUrl = "http://127.0.0.1:3300/api/heroes";

describe("Testing API with correct data", function () {
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

describe("Testing API with incorrect data", function () {
  const nonExistentId = "5f5b4d6a39c030c5dab1f22a";
  const invalidId = "asaaaasss31412412";

  const invalidPostBody_1 = {
    nickname: "Example",
  };
  const invalidPostBody_2 = {
    nickname: true,
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
  const invalidPostBody_3 = {};

  const invalidPatchBody_1 = {};
  const invalidPatchBody_2 = {
    nickname: true,
    real_name: "Bruce Wayne",
  };

  test("GET non-existent-path/ should return status code 404", async () => {
    const res = await request(baseUrl).get("non-existent-path/");

    expect(res.status).toBe(404);
  });

  test("GET /invalid-id should return status code 500 and message - BSONError", async () => {
    const res = await request(baseUrl).get(`/${invalidId}`);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe(
      "BSONError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
    );
  });

  test("GET /non-existent-id should return status code 404", async () => {
    const res = await request(baseUrl).get(`/${nonExistentId}`);

    expect(res.status).toBe(404);
  });

  test("POST / with invalid body should return status code 400", async () => {
    const res_1 = await request(baseUrl).post("/").send(invalidPostBody_1);
    const res_2 = await request(baseUrl).post("/").send(invalidPostBody_2);
    const res_3 = await request(baseUrl).post("/").send(invalidPostBody_3);

    expect(res_1.status).toBe(400);
    expect(res_2.status).toBe(400);
    expect(res_3.status).toBe(400);
  });

  test(`PATCH / with invalid body and non-existent-id should return status code 400, 
  \n because by patch data, first the validity of the body is checked, then the id is checked`, async () => {
    const res_1 = await request(baseUrl)
      .patch(`/${nonExistentId}`)
      .send(invalidPatchBody_1);
    const res_2 = await request(baseUrl)
      .patch(`/${nonExistentId}`)
      .send(invalidPatchBody_2);

    expect(res_1.status).toBe(400);
    expect(res_2.status).toBe(400);
  });

  test("DELETE /non-existent-id should return a status 404", async () => {
    const res = await request(baseUrl).delete(`/${nonExistentId}`);

    expect(res.status).toBe(404);
  });

  test("DELETE /invalid-id should return a status 500", async () => {
    const res = await request(baseUrl).delete(`/${invalidId}`);

    expect(res.status).toBe(500);
  });
});
