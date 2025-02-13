"use strict";
// this file defines the code that will process http requests.
// "For now, it is enough to know that the HTTP request is represented
// by an Incoming Message object, and the response is created by using the
// ServerResponse object"
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("./promises");
const total = 2000000000;
const iterations = 5;
let shared_counter = 0;
const handler = async (req, res) => {
    const request = shared_counter++;
    const iterate = async (iter = 0) => {
        for (let count = 0; count < total; count++) {
            count++;
        }
        const msg = `Request: ${request}, Iteration: ${(iter)}`;
        console.log(msg);
        await promises_1.writePromise.bind(res)(msg + "\n");
        if (iter == iterations - 1) {
            await promises_1.endPromise.bind(res)("Done");
        }
        else {
            setImmediate(() => iterate(++iter));
        }
    };
    iterate();
};
exports.handler = handler;
// This will make multiple requests interleaved
