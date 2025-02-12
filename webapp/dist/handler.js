"use strict";
// this file defines the code that will process http requests.
// "For now, it is enough to know that the HTTP request is represented
// by an Incoming Message object, and the response is created by using the
// ServerResponse object"
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const fs_1 = require("fs");
const handler = (req, res) => {
    (0, fs_1.readFile)("data.json", (err, data) => {
        // reads the contents of a file.
        if (err == null) {
            res.end(data, () => console.log("Filesent"));
        }
        else {
            console.log(`Error: ${err.message}`);
            res.statusCode = 500;
            res.end();
        }
    });
};
exports.handler = handler;
