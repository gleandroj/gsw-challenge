import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";

chai.use(chaiHttp);
chai.should();

const { expect, request } = chai;

describe("Example", () => {

  describe("GET /", () => {
    it("should get /", done => {
      request(server).get("/")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

});