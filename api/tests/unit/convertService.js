import chai from "chai";
import ConvertService from "../../src/services/convertService";

chai.should();
const expect = chai.expect;

describe("ConvertService", () => {
    describe("POST /convert", () => {
        it("when calls with 'TESTE DE MESA' should returns '833777783303_33063377772'", () => {
            expect(ConvertService.messageToCode('TESTE DE MESA')).to.be.equals('833777783303_33063377772')
        });
    });
});
