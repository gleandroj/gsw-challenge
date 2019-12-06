import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";

chai.use(chaiHttp);
chai.should();

const { expect, request } = chai;

describe("Convert Api", () => {

    describe("POST /convert", () => {
        it("should fails when code and message is not send", done => {
            request(server).post("/api/convert")
                .send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body).to.haveOwnProperty('error');
                    done();
                });
        });
    });

});