### Created config folder in backend

- created db.js file inside config folder
- imported mongoose to establish connection to MongoDB

```js
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;
```

```js
function connect(uri: string, options?: mongoose.ConnectOptions | undefined): Promise<typeof mongoose>
```

options: This is an object containing various configuration options for the connection. The options I've specified are as follows:

- useNewUrlParser: true: This option indicates that Mongoose should use the new URL parser for parsing connection strings. The URL parser is necessary to handle certain features of MongoDB connection strings.

useUnifiedTopology: true: This option enables the new unified topology engine for managing connections. It's recommended to use this option as it provides a more reliable and efficient connection handling mechanism.

useFindAndModify: true: This option determines whether Mongoose should use findOneAndUpdate() and findOneAndDelete() rather than the deprecated findAndModify(). By setting it to true, you're enabling the use of the newer methods.

- in server.js file called `connectDB()` function

-added terminal colors by running npm i colors in the root folder, what allows me to change the colors in terminal by importing it in server.js `const colors = require('colors)` and calling it in app.listen

```js
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.blue.bold));
```

and

```js
console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//some code
console.log(`Error: ${error.message}`.red.bold);
```

it will highlight message in terminal according to criteria i specified at the end of the line
