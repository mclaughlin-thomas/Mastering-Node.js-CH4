# Mastering-Node.js-CH4

Server-Side web dev is characterized by processing large volumes of HTTP requests as quickly + efficiently as possible. JS is different than other languages because it only has a single thread of execution. Which mena that HTTP requests are processed one at a time...

What is Concurrency
Concurrency is the execution of multiple threads of code. Node.JS has support for concurrency but it hides the details from the dev

Why is it useful
Concurrency allows sservers to achieve greater throughput by accepting and processing multiple HTTP requests simultaneously

How is it used
Node.js has a single thread of execution for JS code called the main thread. That thread relies on events to coordinate the work required to process different threads of work. The node.js API makes extensive use of concurrrent execution in its APIs but thiis is largely hidden from the dev

Are there any Pitfalls or limitations?
Care must be taken not to block the main thread; otherwise, performance will be impaired

Are there any alternatives?
No, The concurrency model is core to Node.js and understanding it is essential to create web applications that scale economically

Chapter Summary

Perform Tasks Concurrently
Use the Node.js API to handle events with callback functions and promises.
10-15

Wrap Code as Promises or Callbacks
Use promisiffy and callbackify functions
16,17

Avoid Blocking the main thread for simple tasks
Break up work into smaller chunks that can be interleaved with other work
21

Avoid blocking the main thread for complex tasks
Use worker threads
22-27


-----
Understanding (simplified) server code execution

Concurrency is a genuinely fascinating subject, and it can be a rewarding area of research. But beore digging into the details, bear in mind that to be an effective js dev, you only need a basic overview of concurrency - like the one in this chapter.

Server-side web apps need to be able to process many http requests simultaneously to scale up economically so that a small amount of server capacity can be used to support a large number of clients.

The conventional approach is to take advantage of the multi-threaded features
of modern server hardware by creating a pool of handler threads. When a new
HTTP request arrives, it is added to a queue where it waits until one of the
threads is available to process it. The thread processes the request, sends the
response back to the client, and then returns to the queue for the next request.
The server hardware can execute multiple threads simultaneously, as
illustrated in Figure 4.2, so that a large volume of requests can be received
and processed concurrently.