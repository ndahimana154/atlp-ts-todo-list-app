import app from "../../../index";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import { response } from "express";
import usersModel from "../../../database/models/usersModel";
chai.use(chaiHttp);

describe("User Routes", () => {
  let token: string;

  before(async () => {
    // Clear the users collection before starting the tests
    await usersModel.deleteMany({});
  });

  it("should create a new user", (done) => {
    chai
      .request(app)
      .post("/api/users")
      .send({ username: "testuser", password: "testpassword" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("msg")
          .equal("User created successfully");
        done();
      });
  });

  it("should not create a user if username already exists", (done) => {
    chai
      .request(app)
      .post("/api/users")
      .send({ username: "testuser", password: "testpassword" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property("error")
          .equal("Username already exists");
        done();
      });
  });

  it("should log in a user", async () => {
    // Create a test user if it doesn't exist
    let testUser = await usersModel.findOne({ username: "testuser" });
    if (!testUser) {
      const passwordHash = await bcrypt.hash("testpassword", 10);
      testUser = await usersModel.create({
        username: "testuser",
        password: passwordHash,
      });
    }

    // Log in with the test user
    const res = await chai
      .request(app)
      .post("/api/users/login")
      .send({ username: "testuser", password: "testpassword" });

    expect(res).to.have.status(200);
    expect(res.body).to.be.a("string");

    // Verify the token
    token = res.body;
    const decodedToken = jwt.verify(
      token,
      "ofierhjfuionvdfiojvadfiovfviofdjvdfvddvsiosdjai.2122cds"
    ) as { userId: string };
    expect(decodedToken.userId).to.equal(testUser._id.toString());
  });

  it("should retrieve all users", async () => {
    const res = await chai.request(app).get("/api/users");
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("data").to.be.an("array").that.is.not
      .empty;
  });

  after(async () => {
    // Delete the test user
    await usersModel.deleteMany({});
  });
});
