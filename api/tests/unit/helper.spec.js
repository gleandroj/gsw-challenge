import chai from "chai";
import { normalizePort } from "../../src/helpers";

const expect = chai.expect;

describe("helpers", () => {
  describe("normalizePort", () => {
    it("when calls with '8000' should returns number 8000", () => {
      expect(normalizePort("8000")).to.be.deep.equals(8000);
    });

    it("when calls with non number should returns non number", () => {
      expect(normalizePort("teste")).to.be.equals("teste");
    });

    it("when calls with number should returns number", () => {
      expect(normalizePort(400)).to.be.deep.equals(400);
    });
    it("when calls with negative number should returns false", () => {
      expect(normalizePort(-1)).to.be.false;
    });
  });
});
