const express = require("express");
const app = express();
const { chats } = require("./data/data");

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.get("/api/chat", (req, res) => {
  res.status(200).json({ success: true, chats });
});

app.get("/api/chat/:id", (req, res) => {
  //   console.log(req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

app.listen(5000, console.log("Server Started on PORT 5000"));
