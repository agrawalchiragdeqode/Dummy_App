const app = require("../app");
const supertest = require("supertest");
const mongoose=require('mongoose')

test("Create User", async () => {
  const user = {
    name: "rajat",
    email: "abc@gmail.com",
  };
  await supertest(app)
    .post("/add", user)
    .expect(201)
    .then((response) => {
      expect(response.body._id).toBe(user._id);
    });
  return user;
});

test("Get All User", async () => {
  await supertest(app)
    .get("/get")
    .expect(200)
    .then((response) => {
      expect(typeof response.body === "object").toBe(true);
    });
});

test("Update User", async () => {
  updateUser = {
    name: "rajat",
    email: "rajat@gmail.com",
  };
  await supertest(app)
    .put("/update/6231b8ec7bc0f1fe0d80abcb", updateUser)
    .expect(200)
    .then((response) => {
      expect(typeof response.body === "object").toBe(true);
    });
  return updateUser;
});

test("Delete user", async () => {
  await supertest(app).delete("/delete/6231b8ec7bc0f1fe0d80abcb").expect(200);
});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done();
  });