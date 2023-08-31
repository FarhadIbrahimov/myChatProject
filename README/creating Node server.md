1.  npm init
2.  npm i express
3.  create backend folder
4.  in backend folder create file server.js
5.  in server.js import express `const express = require("express")` and ` const app = express()`
6.  install nodemon globally( so server restarts automatically after each change ) by running command `npm install --global nodemon`, then create app.listen `app.listen(5000, console.log("Server Started on PORT 5000"));`
7.  in package.json create custom run command, under scripts `"start": "nodemon backend/server.js"`
8.  create `app.get("/", (req, res) => {
  res.send("API is running....");
});`

9.  create data folder and then `data.js` file inside of it we will store Dummy data to practice api calls

        ```js
        app.get("/api/chat", (req, res) => {

    res.status(200).json({ success: true, chats });
    });

    ```

    ```

```js
app.get("/api/chat/:id", (req, res) => {
// console.log(req.params.id);
const singleChat = chats.find((c) => c.\_id === req.params.id);
res.send(singleChat);
});

```

10. Created .env file is a configuration file used to store environment variables for a project.
11. Installed `dotenv` a popular Node.js library that simplifies the process of loading environment variables from a .env file into your application's process environment.  
     `sh
npm i dotenv`
