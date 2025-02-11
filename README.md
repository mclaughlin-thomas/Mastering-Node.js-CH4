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
