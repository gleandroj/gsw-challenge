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
    let output = "";
    let charCode = "";

    for (let i = 0; i <= code.length; i++) {
      const nCode = code.charAt(i);
      const lnCode = charCode.charAt(charCode.length - 1);

      if (lnCode != "" && (nCode != lnCode || nCode == separator)) {
        const char = tableKeys.find(key => table[key] === charCode);
        charCode = "";
        output = output.concat(char || "");

        if (nCode === separator) continue;
      }

      charCode = charCode.concat(nCode);
    }

    return output;
  }

  messageToCode(message) {
    let output = "";

    for (let i = 0; i < message.length; i++) {
      const key = message.charAt(i);
      const code = table[key];

      if (!code) {
        return "";
      }

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
      code: code && code.toUpperCase(),
      message: message && message.toUpperCase()
    };

    if (code && code.length) {
      conversion.message = this.codeToMessage(conversion.code);
    } else {
      conversion.code = this.messageToCode(conversion.message);
    }

    return await new Conversion(conversion).save();
  }

  async paginate({ page, perPage }) {
    return {
      total: await Conversion.find().countDocuments(),
      page: page,
      perPage: perPage,
      data: await Conversion.find()
        .sort({ _id: -1 })
        .skip(page * perPage)
        .limit(perPage == -1 ? 0 : perPage)
    };
  }
}

export default new ConverService();
