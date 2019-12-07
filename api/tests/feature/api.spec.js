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
          console.log(res.status);
          expect(res.status, "bad request").to.be.eq(400);
          expect(res.body, "body error").to.haveOwnProperty("error");
          done();
        });
    });
  });
});
