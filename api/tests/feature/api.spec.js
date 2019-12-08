import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";

chai.use(chaiHttp);

const { expect, request } = chai;

const API_URL = "/api/conversions";

describe("Convert Api", () => {
  describe(`GET ${API_URL}`, () => {
    it("should returns array of conversions", done => {
      request(server)
        .get(API_URL)
        .end((err, res) => {
          expect(res.status, "ok").to.be.eq(200);
          expect(res.body, "body error").to.a("object");
          expect(res.body).to.haveOwnProperty("data");
          expect(res.body).to.haveOwnProperty("perPage");
          expect(res.body).to.haveOwnProperty("page");
          expect(res.body).to.haveOwnProperty("total");
          expect(res.body.data).to.be.a("array");
          done();
        });
    });
    it("should returns array of conversions when called with page and perPage", done => {
      const params = new URLSearchParams({ page: 1, perPage: 5 });
      request(server)
        .get(`${API_URL}?${params}`)
        .end((err, res) => {
          expect(res.status, "ok").to.be.eq(200);
          expect(res.body, "body error").to.a("object");
          expect(res.body).to.haveOwnProperty("data");
          expect(res.body).to.haveOwnProperty("perPage");
          expect(res.body).to.haveOwnProperty("page");
          expect(res.body).to.haveOwnProperty("total");
          expect(res.body.data).to.be.a("array");
          done();
        });
    });
  });
  describe(`POST ${API_URL}`, () => {
    it("should fails when code and message is not send", done => {
      request(server)
        .post(API_URL)
        .send({})
        .end((err, res) => {
          expect(res.status, "bad request").to.be.eq(400);
          expect(res.body, "body error").to.haveOwnProperty("error");
          done();
        });
    });

    it("should fails when send a invalid code pattern", done => {
      request(server)
        .post(API_URL)
        .send({
          code: "INVALIDO"
        })
        .end((err, res) => {
          expect(res.status, "bad request").to.be.eq(400);
          expect(res.body, "body error").to.haveOwnProperty("error");
          done();
        });
    });

    it("should returns 'Gabriel' when sends '42_2277744433555'", done => {
      request(server)
        .post(API_URL)
        .send({
          code: "42_2277744433555"
        })
        .end((err, res) => {
          expect(res.status, "ok").to.be.eq(200);
          expect(res.body).to.haveOwnProperty("message");
          expect(res.body.message).to.be.equal("GABRIEL");
          done();
        });
    });

    it("should returns '42_2277744433555' when sends 'GABRIEL'", done => {
      request(server)
        .post(API_URL)
        .send({
          message: "GABRIEL"
        })
        .end((err, res) => {
          expect(res.status, "ok").to.be.eq(200);
          expect(res.body).to.haveOwnProperty("code");
          expect(res.body.code).to.be.equal("42_2277744433555");
          done();
        });
    });
  });
});
