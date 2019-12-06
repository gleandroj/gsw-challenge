
const codeTable = ["2", "22", "222", "3", "33", "333",
    "4", "44", "444", "5", "55", "555",
    "6", "66", "666", "7", "77", "777", "7777",
    "8", "88", "888", "9", "99", "999", "9999"];

export default class ConverService {
    constructor() { }

    static convert(table, input) {
        input = input.toUpperCase();
        let output = "";
        const separator = "_";
        const n = input.length;
        for (let i = 0; i < n; i++) {
            if (input[i] == ' ')
                output = output + "0";
            else {
                const position = input[i].charCodeAt(0) - 'A'.charCodeAt(0);
                const endChar = output.charAt(output.length - 1);
                const code = arr[position];
                if (endChar === code.charAt(0)) {
                    output = output.concat(separator)
                }
                output = output.concat(code);
            }
        }
        return output;
    }

    static codeToMessage(code) {
        console.log(code);
    }

    static messageToCode(message) {
        console.log(message);
    }

}