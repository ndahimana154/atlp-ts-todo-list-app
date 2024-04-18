import app from "../../../index";

import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import { response } from "express";

chai.use(chaiHttp);

const router = () => chai.request(app);

describe("Comment test cases", () => {
  it("Should Post task", (done) => {
    router()
      .post("/api/tasks/")
      .send({
        title: "task1",
        description: "I will start by task1",
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("data");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("It should return all tasks", (done) => {
    router()
      .get("/api/tasks/")
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should return one Task", (done) => {
    router()
      .get("/api/tasks/66212b4eb62e86196ebff791")
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });
  it("Should Update task", (done) => {
    const newData = {
      title: "Task10",
      description: "This is task update",
    };

    router()
      .patch("/api/tasks/66212b4eb62e86196ebff791")
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a("object");
        expect(response.body.result).to.be.a("object");
        expect(response.body.result.title).to.equal(newData.title);
        expect(response.body.result.description).to.equal(newData.description);
        done(error);
      });
  });
});
