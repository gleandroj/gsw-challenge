import chai from "chai";
import promised from "chai-as-promised";
import sinon from "sinon";
import { Conversion } from "../../src/models";
import { ConverService } from "../../src/services/convertService";

chai.use(promised);

const expect = chai.expect;
const service = new ConverService();

describe("ConvertService", () => {
  describe("messageToCode", () => {
    it("when calls with 'TESTE DE MESA' should returns '833777783303_33063377772'", () => {
      expect(service.messageToCode("TESTE DE MESA")).to.be.equals(
        "833777783303_33063377772"
      );
    });

    it("when calls with invalid input 'TESTE 123' should returns ''", () => {
      expect(service.messageToCode("TESTE 123")).to.be.equals("");
    });
  });

  describe("codeToMessage", () => {
    it("when calls with '833777783303_33063377772' should returns 'TESTE DE MESA'", () => {
      expect(service.codeToMessage("833777783303_33063377772")).to.be.equals(
        "TESTE DE MESA"
      );
    });

    it("when calls with invalid input '8888' without '_' should returns ''", () => {
      expect(service.codeToMessage("8888")).to.be.equals("");
    });
  });

  describe("convert", () => {
    let saveStub = null;
    before(function() {
      saveStub = sinon.stub(Conversion.prototype, "save").returnsThis();
    });

    it("when calls convert() without params should throw error", () => {
      expect(service.convert({})).to.eventually.be.rejectedWith(Error);
    });

    it("when calls convert() with code should return code and message", async () => {
      const inputCode = "833777783303_33063377772";
      const outputMessage = "TESTE DE MESA";
      const { message, code } = await service.convert({
        code: inputCode
      });
      expect(code).to.be.eq(inputCode);
      expect(message).to.be.eq(outputMessage);
      expect(saveStub.callCount).to.be.eq(1);
    });

    it("when calls convert() with message should return a code and message", async () => {
      const inputMessage = "TESTE DE MESA";
      const outputCode = "833777783303_33063377772";
      const { message, code, _id } = await service.convert({
        message: inputMessage
      });
      expect(_id).to.be.ok;
      expect(code).to.be.eq(outputCode);
      expect(message).to.be.eq(inputMessage);
      expect(saveStub.callCount).to.be.eq(2);
    });
  });

  describe("paginate", () => {
    let findStub = null;
    const returns = [{ _id: "id", code: "code", message: "message" }];
    before(function() {
      findStub = sinon.stub(Conversion, "find").callsFake(() => {
        return {
          sort: sinon.stub().returnsThis(),
          skip: sinon.stub().returnsThis(),
          limit: sinon.stub().resolves(returns)
        };
      });
    });

    it("when calls paginate() it should calls Conversion.find()", async () => {
      expect(await service.paginate({ page: 1, perPage: 5 })).to.be.equal(
        returns
      );
      expect(findStub.callCount).to.be.equal(1);
    });
  });
});
