import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

chai.use(chaiHttp);
chai.should();

describe("Example", () => {
  describe("GET /", () => {
    it("should get /", done => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
