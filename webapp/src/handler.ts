// this file defines the code that will process http requests.
// "For now, it is enough to know that the HTTP request is represented
// by an Incoming Message object, and the response is created by using the
// ServerResponse object"

import { IncomingMessage, ServerResponse } from "http";

export const handler = (req: IncomingMessage, res:ServerResponse) => {
    res.end("Hello World");
};