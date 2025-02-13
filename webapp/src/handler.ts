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
// import { IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs";

// export const handler = (req: IncomingMessage, res:ServerResponse) => {
//     readFile("data.json", (err: Error | null, data: Buffer) => {
//         // reads the contents of a file.
//         if (err == null) {
//             res.end(data, () => console.log("Filesent")); // comes up when user sends request. 3rd callback
//         }
//         //The read operation is asynchronous and is implemented using a native thread.
//         //The contents of the file are passed to a callback function, which sends them to the http client.
//         else {
//             console.log(`Error: ${err.message}`);
//             res.statusCode = 500;
//             res.end();
//         }
//     });
// };


// Now using a promise in the handler.ts file
import { IncomingMessage, ServerResponse } from "http";
//import { readFile } from "fs";
import { readFile } from "fs/promises";
export const handler = (req: IncomingMessage, res: ServerResponse) => {
    const p: Promise<Buffer> = readFile("data.json");
    p.then((data: Buffer) => res.end(data, () => console.log("File sent")));
    p.catch((err: Error) => {
        console.log(`Error: ${err.message}`);
        res.statusCode = 500;
        res.end();
    });
};

// This is not how promises are usually used, but emphasizes the way promises work
// This creates promise
// const p: Promise<Buffer> = readFile("data.json");
// the result returned from the readFile function is Promise<Buffer>, which
// is a promse that will produce a Buffer object when its asynchronous operation is done

// "In most cases, you should use the non-blocking features that
// Node.js provides to maximize the number of requests that
// Node.js can handle, but there are two situations when blockingoperations make more sense. The first situation arises when
// you know for certain that the operations will be completed so
// quickly that it is quicker than setting up a promise or a
// callback. There is a resource and time cost associated with
// performing an asynchronous operation and this can sometimes
// be avoided. This situation doesn’t arise often, and you should
// carefully consider the potential performance impact.
// The second situation is more common, and that’s when you
// know that the next block of code that the main thread will
// execute will be the result of the operation you are about to
// perform. You can see an example of this in Chapter 6, where I
// read configuration files synchronously before Node.js starts
// listening for HTTP requests."
