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