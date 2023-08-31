# User Authentication and Error Handling in Express.js

## Overview

This README provides an overview of the implementation of user authentication and error handling in an Express.js application. It covers topics such as password hashing, error middleware, and the use of `express-async-handler` for asynchronous route handling.

## Table of Contents

- [Dependencies](#dependencies)
- [Password Hashing](#password-hashing)
- [User Authentication](#user-authentication)
- [Error Handling Middleware](#error-handling-middleware)
- [Integration](#integration)
- [Conclusion](#conclusion)

## Dependencies

To begin, set up the necessary dependencies:

- Create middleware folders for error handling and store middleware functions there.
- Install `express-async-handler` to simplify error handling for asynchronous route handlers.
- Install `jsonwebtoken` to enable user authorization.
- Install `bcryptjs` for secure password hashing.

```bash
npm install express-async-handler jsonwebtoken bcryptjs
```

### Password Hashing

Securely storing user passwords is crucial. Use the bcryptjs library to hash passwords before saving them:

```js
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

This code hashes user passwords before storing or updating them in the database. It generates a salt and hashes the password using bcrypt.hash.

### User Authentication

For user authentication during login, use the matchPassword method:

```js
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```

The matchPassword method compares the entered plain-text password with the hashed password using bcrypt.compare.

### Error Handling Middleware

Create two middleware functions, notFound and errorHandler, to handle errors effectively:

#### `notFound` Middleware

```js
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
```

This middleware handles 404 "Not Found" errors by creating an error object and passing it to the next middleware.

#### `errorHandler` Middleware

```js
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
```

The `errorHandler` middleware handles general errors. It sets the response status code and sends an error message. In development mode, it includes the stack trace for debugging.

### Integration

Integrate the middleware into your Express application:

```js
const express = require("express");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// ... other middleware and routes ...

// Use the middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Conclusion

This code adds the error handling middleware functions to your Express application, providing consistent error handling and better debugging.

==By implementing secure password hashing, user authentication, and error handling middleware, your Express.js application becomes more resilient and user-friendly. These practices enhance security, improve user experience, and ensure the reliability of your application.==

[more reference about Express Error Handling](https://expressjs.com/en/guide/error-handling.html)
