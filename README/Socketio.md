We use Socket.io for real time messaging

> :memo:

```js
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: { origins: "http://localhost:5000" },
});
```

> const io = require("socket.io")(server, { ... });: This line imports the socket.io package and initializes it with the provided >server object. The server object is an HTTP server instance that will be used to establish the socket connection.

> pingTimeout: 60000,: This line sets the timeout for a ping request to 60,000 milliseconds or 60 seconds. In the context of Socket.>IO, pingTimeout refers to the maximum time allowed for the server to receive a response to a "ping" packet from the client. If the >client does not respond within this timeout period, the server assumes that the client has disconnected.

> cors: { origins: "http://localhost:5000" },: This line configures Cross-Origin Resource Sharing (CORS) settings for the Socket.IO >server. It specifies that only requests from the origin "http://localhost:5000" are allowed to access this server's resources. CORS >is important for security reasons, as it prevents malicious scripts from accessing sensitive data from different origins.

[socket.io](https://socket.io/docs/v4/tutorial/introduction)

after installing socket.io and writing logic for it, tested it works

downloaded json file for typing animation from [Lottie files website](https://lottiefiles.com/)

then downloaded library
in the frontend folder , client folder run `npm i react-lottie`
since i am usning react version 18 and lottie is working for react 16 i had to run command `npm install react-lottie --legacy-peer-deps`
installed `react-lottie` with the `--legacy-peer-deps` flag, which allows npm to use an older, potentially incompatible version of a dependency.
