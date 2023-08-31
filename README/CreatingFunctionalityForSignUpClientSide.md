- console.js:213 Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components

```js
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
```

to solve this error all i had to do is just add empty string as shown in code above
