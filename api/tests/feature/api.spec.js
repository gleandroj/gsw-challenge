import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";

chai.use(chaiHttp);

const { expect, request } = chai;

describe("Convert Api", () => {
  describe("POST /convert", () => {
    it("should fails when code and message is not send", done => {
      request(server)
        .post("/api/convert")
        .send({})
        .end((err, res) => {
          expect(res.status, "bad request").to.be.eq(400);
          expect(res.body, "body error").to.haveOwnProperty("error");
          done();
        });
    });

    it("should fails when send a invalid code pattern", done => {
      request(server)
        .post("/api/convert")
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
        .post("/api/convert")
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
        .post("/api/convert")
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
