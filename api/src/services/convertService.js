import { Conversion } from "../models";

const table = {
  A: "2",
  B: "22",
  C: "222",
  D: "3",
  E: "33",
  F: "333",
  G: "4",
  H: "44",
  I: "444",
  J: "5",
  K: "55",
  L: "555",
  M: "6",
  N: "66",
  O: "666",
  P: "7",
  Q: "77",
  R: "777",
  S: "7777",
  T: "8",
  U: "88",
  V: "888",
  W: "9",
  X: "99",
  Y: "999",
  Z: "9999",
  " ": "0"
};
const tableKeys = Object.keys(table);
const separator = "_";

export class ConverService {
  constructor() {}

  codeToMessage(code) {
    const input = code.toLowerCase();
    let output = "";
    let charCode = "";

    for (let i = 0; i <= input.length; i++) {
      const nCode = input.charAt(i);
      const lnCode = charCode.charAt(charCode.length - 1);

      if (lnCode != "" && (nCode != lnCode || nCode == separator)) {
        const char = tableKeys.find(key => table[key] === charCode);
        charCode = "";
        output = output.concat(char);

        if (nCode === separator) continue;
      }

      charCode = charCode.concat(nCode);
    }

    return output;
  }

  messageToCode(message) {
    const input = message.toUpperCase();
    let output = "";

    for (let i = 0; i < input.length; i++) {
      const key = input.charAt(i);
      const code = table[key];
      const fCode = code.charAt(0);
      const lCode = output.charAt(output.length - 1);

      if (fCode === lCode) {
        output = output.concat(separator);
      }

      output = output.concat(code);
    }

    return output;
  }

  async convert({ code, message }) {
    if (!code && !message) {
      throw new Error(
        "O campo mensagem é obrigatório quando o código não está presente."
      );
    }

    const conversion = {
      code: code,
      message: message
    };

    if (code) {
      conversion.message = this.codeToMessage(code);
    } else {
      conversion.code = this.messageToCode(message);
    }

    return await new Conversion(conversion).save();
  }
}

export default new ConverService();
