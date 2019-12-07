import chai from "chai";
import ConvertService from "../../src/services/convertService";

const expect = chai.expect;

describe("ConvertService", () => {
    describe("messageToCode", () => {
        it("when calls with 'TESTE DE MESA' should returns '833777783303_33063377772'", () => {
            expect(ConvertService.messageToCode('TESTE DE MESA')).to.be.equals('833777783303_33063377772')
        });
    });

    describe("codeToMessage", () => {
        it("when calls with '833777783303_33063377772' should returns 'TESTE DE MESA'", () => {
            expect(ConvertService.codeToMessage('833777783303_33063377772')).to.be.equals('TESTE DE MESA')
        });
    });
});
