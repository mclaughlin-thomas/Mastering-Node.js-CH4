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

The above approach makes use of the server hardware, but it requires us devs to consider how the requests might interfere with eachother. 

A common problem is that one handler thread modifies data as it is being read by another thread producing an unexpected result.

To avoid the above issue, most languages have keywords to restrict interactions between threads. The details vary, but keywords like lock and synchronize are used to ensure threads safely use shared resources and data by creating protected refions of code that can only be executed by one thread at a time.

Writing code that uses threads is a balannce of safety and performance.
Protected Regions of code are potential performance bottlenecks, and if protections are applied to widely, then performance suffers and the number of requests that can be processed concurrently falls. But, requests may interfere with one another and produce unexpected results if protections are applied too sparsely.

Understanding Blocking and non-blocking operations

in most server-side apps, the thread processing an http request spends most of its time waiting. That can be from waiting for a database to produce a result, waiting for the next chunk of data from a file, or waiting for access to a protected region of code.

When a thread is waiting, it is said to be blocked. A blocked thread is unable to any other work until the operation it is waiting for, has been completed; during which time, the capacity of the server to process requests is reduced. In busy apps, there is a constant flow of new requests arriving, and having threads tied up doing nothing leads to queues of requests waiting to be processed and reduced overall throughput.

One solution to the above, is to use non-blocking operations, also known as asynchronous operations.

"Imagine that, after taking an order, an employee in the restaurant went into
the kitchen, assembled your pizza, put it in the oven, stood there waiting for it
to cook for 10 minutes, and then served it to you. This is the blocking – or
synchronous – approach to preparing pizza."
There is a better approach....

"There is a more sensible approach. One employee – let’s name them Bob – is
given the job of monitoring the oven. The other employees take orders,
assemble the pizzas, and put them in the oven just as before, but rather than
waiting for them to cook, they ask Bob to tell them when the pizza is cooked.
While Bob watches the pizzas in the oven, the employees can carry on
working, taking the order of the next customer in the queue, preparing the
next pizza, and so on. Bob can watch lots of pizzas, so the limit to the number
of pizzas that can be produced is the size of the oven and not the number of
employees.
Cooking a pizza has become a non-blocking operation for everyone except
Bob. There is no way around waiting for the oven, but the performance of the
restaurant is improved by making one person do all the waiting. Everyone is
happy.
Well, almost. The owner is happy because the restaurant produces more
pizzas. The customers in the queue are happy because employees can start
working on their pizza while Bob is watching earlier orders. But individual
orders may take longer: Bob may tell another employee that a pizza is ready,
but they won’t be able to serve it if they are busy with another customer. The
overall restaurant performance improves, but individual orders may take
longer to complete." figure 4.3 goes along.

"Instead of waiting for an operation to complete, handler threads rely on a
monitor thread while they continue to process requests from the queue. When
the blocking operation has finished, the monitor thread puts the request back
in the queue so that a handler thread can continue processing the request.
The process of handing off an operation for monitoring is usually integrated
into the API used to write web applications, so that performing a read from a
file, for example, automatically releases the handler thread so it can do other
work and can be trusted to put the request in the queue for processing whenthe file read operation is complete.
It is important to understand that the terms non-blocking and asynchronous
are from the perspective of the handler thread. The operations still take time
to complete, but the handler thread can do other work during that period.
There are still blocking threads, but they are not the ones responsible for
processing HTTP requests, which are the threads we care about the most." Mastering Node.js

Understanding Javascript code execution
JS was originally used to provide user interaction with html elements. Each type of element defines
events that describe the different ways the user can interact with that element. A buttom element, for ex,
has events for when the user clicks the button, moves the pointer over the button and so on.

The programmer writes js functions called callbacks and uses the browsers api to associate these functions with
specific events on elements. When the browser detects an event, it adds the callback to a queue so it can be executed by The
JS runtime.

JS runtime has only a single thread: The main thread. The main thread is responsible for executing the callbacks.
Main thread runs in a loop, taking callbacks from the queue and executing them, which is referred to as the JS event loop.

The js runtime only ever executes on callback, so the JS language doesnt need keywords like lock and synchronize.
JS code interacts through the browser through an API that hides away the implementation details and receives results consistently.

Understanding Node.js Code Execution
Node.js retains the main thread and the event loop, which means that server side code is executed in the same way
as client-side js. For HTTP servers, the main thread is the only request handler, and callbacks are used to handle incoming 
HTTP connections.

The example application demonstrates the use of a callback to handle an http request:

const server = createServer(handler);

The callback function passed to the createServer function will be invoked when Node.js receives an http connection.
The function defines parameters that represent the request that has been received and the response that will be returned to the client:

export const handler = (req: IncomingMessage, res: ServerResponse) => {
    res.end("Hello World");
};

Ch5 talks of the callback function, but the callback fcn uses its parameters to prepare the response that will be sent to the client. 
Node JS may only have a single handler thread, but the performance can be excellent because modern server hardware is incredibly fast.

But, single thread does not take full advantage of the multi-core and multi-processor hardware to which most applications are deployed.

For the above, to scale up, multiple instances of Node.js are started. HTTP requests are received by a load balancer, and distributed to the node.js instances.

The individual node.js instances still have a single js thread but collectively they can process a higher volume of requests.

Problem of blocking the main thread. We do not want that.
"Node.js helps programmers avoid blocking
the main thread in two ways: an API that performs many tasks
asynchronously, known as the worker pool, and support for starting extra
threads to execute blocking JavaScript code, known as worker threads." Mastering Node.js

Using the Node.js API
Node.js replaces the API provided by the browser with one that supports common server-side tasks, like processing http requests and reading files. Behind the scenes, node.js uses native threads, known as the worker pool, to perform operations asynchronously.

Handling Events
Events are used to provide notifications that the state of the application has changed and provide an opportuninity to execute a callback function to handle that change. Events are handled through the node.js api, though these are often conveinence features that hide away the details. Server.ts

Working with promises
Promises are an alternative to callbacks and some parts of the Node.js API give us features to use both callbacks and promises. A promise serves the same purpose as a callback, which is to define the code that iwll be executed when the asynchronous operation is done. The main difference is that the code written with promises tend to be simpler than the callback counterpart.

Executing Custom Code
all js is executed by main thread, which means that any operation that does not use the non-blocking API from node.js WILL block the thread. 