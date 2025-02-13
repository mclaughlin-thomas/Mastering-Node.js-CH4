"use strict";
// this file defines the code that will process http requests.
// "For now, it is enough to know that the HTTP request is represented
// by an Incoming Message object, and the response is created by using the
// ServerResponse object"
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("fs/promises");
const handler = async (req, res) => {
    const data = await (0, promises_1.readFile)("data.json");
    res.end(data, () => console.log("File sent"));
};
exports.handler = handler;
