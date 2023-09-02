## Search User and Create Chat

created route in userRoutes

```js
router.route("/").get(allUsers);
```

created allUsers controller in userController
first i created function, added it to routes, and just logged keyword to test it out in POSTMAN,

```js
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query;

  console.log(keyword);
});
```

added allUsers to routes (imported and added .get )

```js
router.route("/").post(registerUser).get(allUsers);
router.post("/login", authUser);
```

in POSTMAN sent request GET
`http://localhost:5000/api/user?search=yourFirstName&lastname=yourLastName`

checked the console in VS code and verified that it logs first and last names

then in userController added search after query, and sent request through POSTMAN

```js
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search;

  console.log(keyword);
});
```

in VS console it logs value specified in search query which is yourFirstName according to query above
After successful testing we continue to write controller logic

```js
// /api/user , we are going to use queries to get all the users /api/user?search=userName
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          //if we have a query in the url then we are going to search for the name or email that matches the query
          //if we don't have a query in the url then we are going to return all the users

          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
});
```

### Understanding Regular Expressions in JavaScript

Regular expressions (regex or regexp) are patterns used for matching character combinations in strings. They are often used for tasks like searching, validation, and data extraction.

In the code snippet I provided, we see the usage of regex in a JavaScript route handler function. Let's break it down step by step.

`req.query.search` is a way to access the "search" query parameter from the request URL. This parameter contains the search term provided by the user.

`$or` is a MongoDB operator that specifies multiple conditions. In this case, we want to find documents that match at least one of the conditions inside the `$or` array.

`{ name: { $regex: req.query.search, $options: "i" } }` is one of the conditions. It's using the `$regex` operator, which tells MongoDB to perform a regex search. Here's what's happening:

name is the field in the MongoDB document we want to search in.

`$regex: req.query.search` is where the regex magic happens. `req.query.search` contains the user's search term. This part creates a regex pattern using that search term.

`$options: "i"` is an option that makes the regex search case-insensitive. This means it will match "John" and "john" equally.

`{ email: { $regex: req.query.search, $options: "i" } }` is similar to the previous condition but applied to the "email" field.

\*In simpler terms, this code checks if a "search" term is provided in the URL. If it is, it constructs a MongoDB query to find users whose "name" or "email" matches that term, regardless of case. If no search term is provided, it sets an empty object as the keyword, meaning it won't filter based on the search term.

Regular expressions might look complex, but they are a powerful tool for working with text data. In this case, they help create flexible and case-insensitive search queries.\*

next
we create code that performs a MongoDB query to retrieve a list of users from the "User" collection, excluding the currently authenticated user. It first uses the keyword object to specify initial search criteria (which can vary depending on your application's needs), and then it refines the results by excluding the current user based on their `_id`.

```javascript
const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
res.send(users);
```

`.find({ _id: { $ne: req.user._id } }):` After the initial .find(keyword) query, we have another .find() method chained to it. This second query refines the results based on the user's ID.

`{ $ne: req.user._id }:` This is a query condition specified using the `$ne` operator. `$ne` stands for "not equal." In this context, it's used to find documents whose `_id` is not equal to the `_id` of the currently authenticated user `(req.user._id)`. This effectively filters out the current user from the results.

after creating this we need to test it in POSTMAN
in order to test it in POSTMAN i comment out `.find({_id: { $ne : req.user._id}})` because at this stage we do not have proper logic built yet.(we have to authorize the user that is currently logged in and for that we need User to login and provide us web token)

In POSTMAN i will run search
`http://localhost:5000/api/user?search=f`

if I have user with letter f stored in my DB then it will return info with that user , if there is no such user i will receive empty array

[`$or` operator documentation](https://www.mongodb.com/docs/manual/reference/operator/query/or/)
[`$regex` documentation](https://www.mongodb.com/docs/manual/reference/operator/query/regex/)
[`$ne` operator documentation](https://www.mongodb.com/docs/manual/reference/operator/query/ne/)

next we create Authorization middleware , in middleware folder i created authMiddleware.js

# Protect Middleware Explanation

This document provides a detailed explanation of the `protect` middleware function in JavaScript.

## Overview

The `protect` middleware function is commonly used in web applications to secure routes by verifying the authenticity of an incoming JSON Web Token (JWT) sent with the HTTP request headers. It ensures that only authenticated users can access specific routes.

Here's a step-by-step breakdown of the `protect` middleware function:

```js
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  //next moves to the next step
  let token;

  // Step 1: Check if the request contains an Authorization header with a Bearer token.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Step 2: Extract the token from the Authorization header.
      token = req.headers.authorization.split(" ")[1];

      // Step 3: Verify and decode the JWT token using a secret key (JWT_SECRET).
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Step 4: Find the user associated with the decoded token ID and exclude the password.
      req.user = await User.findById(decoded.id).select("-password");

      // Step 5: Call the 'next' middleware to proceed to the protected route.
      next();
    } catch (error) {
      // Step 6: Handle token verification errors by sending a 401 Unauthorized response.
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // Step 7: If no token is found in the headers, send a 401 Unauthorized response.
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
```

### Explanation

The middleware begins by initializing a variable called token.

It checks if the incoming request contains an Authorization header that starts with "Bearer," which is a common format for sending JWTs.

If such a header is found, the middleware proceeds to extract the token from the header.

The extracted token is then verified and decoded using a secret key (usually stored in an environment variable). If the verification is successful, the payload of the JWT is decoded to reveal the user's unique identifier (id).

```
`req.headers.authorization` retrieves the value of the Authorization header from the HTTP request. This value typically looks like "Bearer <token>", where <token> is the actual bearer token.

`.split(" ")` is used to split this string into an array using a space character as the delimiter. In this case, it separates the "Bearer" keyword from the token itself.
```

The middleware retrieves user information from a database (in this case, a MongoDB User model) based on the decoded id. The user's password is excluded from the retrieved data for security reasons.

If any errors occur during the token verification or user retrieval, the middleware sends a 401 Unauthorized response with an error message.

If no valid token is found in the headers, the middleware also sends a 401 Unauthorized response.

The protect middleware can be used to secure routes, ensuring that only authenticated users with valid tokens can access protected resources.

## Creating CHat

first i will start of creating routes
I added middleware in server.js
`app.use("api/chat", chatRoutes);`

then in routes created chatRoutes.js file with all the routes

```js
router.route("/").post(protect, accessChat); // for accessing or creating the Chat, included protect middleware, so only logged in User can access this route
router.route.route("/").get(protect, fetchChat); //to access all of the chats from DB for that particular User
router.route("/:group").post(protect, createGroup); // to create Group
router.route("/rename").put(protect, renameGroup); // to rename Group
router.route("/groupRemove").put(protect, removeFromGroup); //to remove or leave the Group
router.route("/groupAdd").put(protect, addGroup); // to add someone to the Group
```

then export it and import to server.js

Then we create controllers for our chat routes

creating access Chat controller

```js
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body; // Extract the userId from the request body

  // Check if userId is missing in the request
  if (!userId) {
    console.log("User Id not send in request");
    return res.sendStatus(400); // Respond with a "Bad Request" status code
  }
  // Check if there is an existing one-on-one chat between the authenticated user and the specified userId
  let isChat = await Chat.find({
    isGroupChat: false, // Ensure it's not a group chat
    $and: [
      //  isGroupChat is false, indicating it's a one-on-one chat.
      // The chat must contain both the authenticated user (retrieved from req.user._id) and the specified userId.
      { users: { $elemMatch: { $eq: req.user._id } } }, // Check if the authenticated user is part of the chat
      { users: { $elemMatch: { $eq: userId } } }, // Check if the specified userId is also part of the chat
    ],
  })
    .populate("users", "-password") // Populate the 'users' field while excluding passwords
    .populate("latestMessage"); // Populate the 'latestMessage' field

  // Populate the sender information in the latest message
  isChat = await User.populate(isChat, {
    path: `latestMessage.sender`,
    select: "name pic email",
  });
  // If an existing chat is found, respond with it
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    // If no existing chat is found, create a new one-on-one chat
    let chatData = {
      chatName: "sender", // Set a default chat name (you may want to customize this)
      isGroupChat: false, // Ensure it's not a group chat
      users: [req.user._id, userId], // Include the authenticated user and the specified userId
    };
    try {
      // Create the new chat
      const createdChat = await Chat.create(chatData);
      // Fetch the newly created chat with populated user data (excluding passwords)
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat); // Respond with the newly created chat
    } catch (error) {
      res.status(400); // Respond with a "Bad Request" status code
      throw new Error(error.message);
    }
  }
});
```

> [!NOTE]
> -- `$and:` This is a MongoDB operator used to perform a logical AND operation on an array of conditions. It ensures that all the specified conditions within the array must be true for a document to match the query.
> -- `$eq` is a comparison operator used for equality checks. It is used to compare the value of a specified field with a specified value.
> -- `$elemMatch` is an operator used to query and filter elements within an array field. It allows you to specify multiple criteria (conditions) for matching elements within an array.

`{ users: { $elemMatch: { $eq: req.user._id } } }:` This is the first condition in the $and array. Let's break it down further:

`users:` This refers to a field named "users" in a MongoDB document. In this context, it likely represents an array field that contains user references.
`$elemMatch:` ensures that at least one element within the array satisfies the specified condition.
`$eq: req.user._id` This is the condition applied to the "users" array. It checks if any element in the "users" array is equal to the value of req.user.\_id.
`{ users: { $elemMatch: { $eq: userId } } }:` This is the second condition in the `$and` array, and it is similar to the first one. It checks if any element in the "users" array is equal to the value of userId.

Now, let's put it all together: The overall query is looking for documents in a MongoDB collection where both of the following conditions are met:

The "users" array contains at least one element that matches the value of req.user.\_id.
The "users" array also contains at least one element that matches the value of userId.
In the context of a chat application, this query is used to find chat conversations that involve both the authenticated user `(req.user._id)` and another user specified by userId. It ensures that the chat conversation includes both participants.

[`$and:` operator documentation](https://www.mongodb.com/docs/manual/reference/operator/query/and/)
[`$elemMatch:` documentation](https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/)
[`$eq:` operator documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/eq/)
