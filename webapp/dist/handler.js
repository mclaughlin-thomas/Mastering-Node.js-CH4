"use strict";
// this file defines the code that will process http requests.
// "For now, it is enough to know that the HTTP request is represented
// by an Incoming Message object, and the response is created by using the
// ServerResponse object"
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("fs/promises");
const promises_2 = require("./promises"); // NEW
const handler = async (req, res) => {
    try {
        const data = await (0, promises_1.readFile)("data.json");
        await promises_2.endPromise.bind(res)(data); // NEW, have to bind method when using the await keyword on the fcn that promisify creates
        console.log("File sent"); // NEW
    }
    catch (err) {
        console.log(`Error: ${err?.message ?? err}`);
        res.statusCode = 500;
        res.end();
    }
};
exports.handler = handler;
