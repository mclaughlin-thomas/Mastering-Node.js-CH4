// This code creates a simple http server that listens for http requests
// on port 5000 and processes them using the fcn defined in handler.ts

import { createServer } from "http";
import { handler } from "./handler";
const port = 5000;
const server = createServer(handler);
server.listen(port, function() {
    console.log(`Server listening on port ${port}`);
});