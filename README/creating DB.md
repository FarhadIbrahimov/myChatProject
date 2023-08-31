## Creating a Chat Schema with Mongoose

1. Inside the `backend` folder, create a `models` folder.
2. Inside the `models` folder, create a file named `ChatModel.js` where we will define the Chat Schema.
3. Install Mongoose in the backend using the command `npm i mongoose`. You can find the official [Mongoose documentation here](https://mongoosejs.com/docs/).

```javascript
const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Refers to the User schema for user IDs
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message", // Refers to the Message schema for message IDs
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User schema for group admin ID
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);
```

-- const mongoose = require("mongoose");: This line imports the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB. It provides an easier way to interact with MongoDB databases in a structured manner.

-- const chatModel = mongoose.Schema(...): Here, we define a Mongoose schema named chatModel. A schema defines the structure and attributes of the documents that will be stored in the MongoDB collection associated with this schema.

-- Inside the mongoose.Schema(...), we define the properties of the chatModel schema:

-- chatName: A field to store the name of the chat. It's of type String, and trim: true removes any leading or trailing white spaces.

-- isGroupChat: This field indicates whether the chat is a group chat. It's of type Boolean and has a default value of false.

-- users: An array that stores user IDs participating in the chat. Each user ID is of type mongoose.Schema.Types.ObjectId, referring to the unique identifier of a document in the MongoDB collection associated with the "User" schema. Contains ID for particular USER stored in DB.

-- latestMessage: Stores the ID of the latest message in the chat. Similar to the users field, it's of type mongoose.Schema.Types.ObjectId and refers to the ID of a document in the MongoDB collection associated with the "Message" schema.

-- groupAdmin: Stores the user ID of the group admin, if the chat is a group chat. Like the previous fields, it's of type mongoose.Schema.Types.ObjectId and refers to the ID of a document in the MongoDB collection associated with the "User" schema.

-- { timestamps: true }: Specifies that each document in this collection should automatically have two fields, createdAt and updatedAt, which track the creation and modification times of each document.

## Creating Message Schema

```javascript
const MessageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageModel);

module.exports = Message;
```

### Schema Details

- `sender`: The user who sent the message (reference to the User model).
- `content`: The content of the message.
- `chat`: The chat where the message belongs (reference to the Chat model).

## Creating User Schema

```javascript
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
```

## Schema Details

- `name`: The user's name.
- `email`: The user's email (used for authentication).
- `password`: The user's password (hashed for security).
- `pic`: The default URL of the user's profile picture if User did not upload any picture.
