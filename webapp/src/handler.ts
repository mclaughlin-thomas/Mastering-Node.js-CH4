// this file defines the code that will process http requests.
// "For now, it is enough to know that the HTTP request is represented
// by an Incoming Message object, and the response is created by using the
// ServerResponse object"

// import { IncomingMessage, ServerResponse } from "http";

// export const handler = (req: IncomingMessage, res:ServerResponse) => {
//     res.end("Hello World");
// };

// Using the node.js API to read the contents of a file.
// three callbacks in the code. One that is passed to the createServer function, which is invoked when
// an http request is received.
// Another callback is the one that is passed to the readFile function, which is invoked when
// when the contents of the file have been read or if an error occurs.
// Then the third callback is invoked when the data read from the file has been sent to the client

//Breaking up the process of producing an http response with callbacks
// means that the js main thread does not have to wait for the file system to read the contents of the file,
// this allows requests from other clients to be procesed.
import { IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs";

export const handler = (req: IncomingMessage, res:ServerResponse) => {
    readFile("data.json", (err: Error | null, data: Buffer) => {
        // reads the contents of a file.
        if (err == null) {
            res.end(data, () => console.log("Filesent")); // comes up when user sends request. 3rd callback
        }
        //The read operation is asynchronous and is implemented using a native thread.
        //The contents of the file are passed to a callback function, which sends them to the http client.
        else {
            console.log(`Error: ${err.message}`);
            res.statusCode = 500;
            res.end();
        }
    });
};