I had much more errors, these are the ones i did not forget to note

#### Error 1 :eyes:

` console.js:213 Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components`

```js
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
```

to solve this error all i had to do is just add empty string as shown in code above

2. ### Error 2 :hankey:

`` throw new Error(msg);
^

Error: Route.get() requires a callback function but got a [object Undefined]``

the problem was incorrect exporting of a function in authMiddleware.js file, I had it `module.exports =  protect;` instead of `module.exports = { protect };` :bowtie: :bowtie: :bowtie:

3. ### :weary: Error 3 :confounded: :cry:

This error was in POSTMAN when i was testing the API to create one on one chat
I was sending POST request to `http://localhost:5000/api/chat` with userId in Body that i got from MongoDB

```
{
    "userId":"64f29d9c94b59e82cbf09911"
}
```

I would receive

```
"message": " Not Found - /api/chat",
    "stack": "Error: This Not Found - /api/chat\n    at notFound
```

Turned out that i forgot `/ ` in front of `api` in chatRoutes middleware, and it routed NotFound error middleware
after adding `/ ` all the users lived Happily Ever After!!! :smirk: :hushed:

```js
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);
```

:see_no_evil: :hear_no_evil: :speak_no_evil:

SearchUser bar if i type in m it renders all the users
