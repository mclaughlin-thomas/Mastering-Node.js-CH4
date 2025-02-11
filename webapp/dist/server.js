"use strict";
// This code creates a simple http server that listens for http requests
// on port 5000 and processes them using the fcn defined in handler.ts
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const handler_1 = require("./handler");
const port = 5000;
const server = (0, http_1.createServer)(handler_1.handler);
server.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});
