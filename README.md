# Nodespull

An interface to help you configure and run stable, scalable Node.js api servers in minutes.
With single-line commands, Nodespull can implement JWT-based authentication, server routing, database modeling (and deployment), emailing services, mobile services, scheduled tasks, and much more.

## Getting Started

These instructions will get you started with Nodespull.

### Prerequisites

Make sure that you have access to a MySQL database server.

### Installing

Download and install the Nodespull package from npm

```
npm i nodespull
```

Create a node.js project on your machine

```
npm init
```

Start a mysql database server, whether local or remote (it doesn't matter),

Open your root file (e.g. index.js), and import the nodespull library

```
const $ = require("nodespull");

// will add more codes later

$.startServer(8080); // starts the server on port 8080

```


Write your first route and its controller using nodespull

```
const $ = require("nodespull");

$.routes
.whenGET("/welcome")
.then((data, reply)=>{
    reply.ok({message:"hello world"})
})

$.startServer(8080); // start server on port 8080

```

See tutorials to learn more.
* [Getting Started](https://github.com/kab-zac/nodespull/blob/master/Pending)
* [Create or secure a route](https://github.com/kab-zac/nodespull/blob/master/Pending)
* [Configure database](https://github.com/kab-zac/nodespull/blob/master/Pending)
* [Create and manage database models](https://github.com/kab-zac/nodespull/blob/master/Pending)



## Running your Nodes.js app

Run your root file 
```
node index.js
```
Using a web browser, navigate to localhost:8080 (or any port you entered). You should see a "Congratulations! You're pooling!" message.


### Connect to your nodespull api server from a client

After the instructions above, you should be able to send a GET request to "localhost:8080/welcome" using Postman or a web browser. Observe that the response is a JSON object with the phrase "hello world".


## Deployment

Your server can be deployed whenever you're ready. Follow the Nodespull Deployment Checklist to ensure a successful release.
* [Deployment Checklist](https://github.com/kab-zac/nodespull/blob/master/Pending)

<!-- ## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. -->

## Authors

* **Isaac Kabuika** - [Isaackbn](https://github.com/kab-zac/)

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
