const asyncHandler = require("express-async-handler");
const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const Chat = require("../models/ChatModel");

const sendMessages = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(400);
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic email");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    // console.log(message);

    let chatHistroy = await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    // console.log(req.body.chatId);

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessages, allMessages };
