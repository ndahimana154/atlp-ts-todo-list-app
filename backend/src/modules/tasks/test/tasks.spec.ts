import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import { response } from "express";

chai.use(chaiHttp);

const router = () => chai.request(app);

describe("Task API Test Cases", () => {
  let taskId: string; // Store the task ID for later use in update and delete tests

  it("Should Post Task", (done) => {
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

        // Store the task ID for later use
        taskId = response.body.data._id;

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
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.be.an("array");
        done(error);
      });
  });

  it("Should return one Task", (done) => {
    router()
      .get(`/api/tasks/${taskId}`) // Use the stored task ID
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should Update task", (done) => {
    const newData = {
      title: "Task10",
      description: "This is task update",
    };

    router()
      .patch(`/api/tasks/${taskId}`) // Use the stored task ID
      .send(newData) // Send updated data in the request body
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("result");
        expect(response.body.result).to.be.a("object");
        expect(response.body.result.title).to.equal(newData.title);
        expect(response.body.result.description).to.equal(newData.description);
        done(error);
      });
  });

  it("Should Delete task", (done) => {
    router()
      .delete(`/api/tasks/${taskId}`) // Use the stored task ID
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should handle errors when posting a task with invalid data", (done) => {
    router()
      .post("/api/tasks/")
      .send({
        // Invalid data without a title
        description: "This is an invalid task",
      })
      .end((error, response) => {
        expect(response).to.have.status(500); // Expecting a server error due to invalid data
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("error");
        done(error);
      });
  });
});
