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
  });

  describe("codeToMessage", () => {
    it("when calls with '833777783303_33063377772' should returns 'TESTE DE MESA'", () => {
      expect(service.codeToMessage("833777783303_33063377772")).to.be.equals(
        "TESTE DE MESA"
      );
    });
  });

  describe("convert", () => {
    let saveStub = null;
    before(function() {
      saveStub = sinon.stub(Conversion.prototype, "save").returnsThis();
    });

    it("when calls convert() without params should throw error", async () => {
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
});
