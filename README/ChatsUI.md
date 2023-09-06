Created Context folder
created ChatContext.Provider inside the folder
in main.jsx wrap my app into ChatProvider , so whatever state i create inside Context it is going to be accessible everywhere in our app

then i create user state in const ChatProvider

```js
cosnt ChatProvider = ({ children }) => {

const[user, setUser] = useState();
```

```js
<ChatContext.Provider value={{ user, setUser }}>
  {children}
</ChatContext.Provider>
```

when we do login and signup we are storing our value in a local storage
created useEffect for that, and fetched localStorage inside of useEffect

```js

cosnt ChatProvider = ({ children }) => {

const[user, setUser] = useState();

const history = useHistory();

useEffect(() => {
const userInfo = JSON.parse(localStorage.getItem("userInfo") );
setUser(userInfo);

    if(!userInfo) {
        history.push("/");
    }

}, [history]);

```

if statement redirects to login page if the user is not logged in
i declare history at the end of userEffect in [] so it runs again every time history is changed

Working on SideDrawer.jsx
[Tooltip from Chakra-UI](https://chakra-ui.com/docs/components/tooltip)
[search icon form font awesome](https://fontawesome.com/v4/icon/search)
[search icon cdn from font awesome](https://cdnjs.com/libraries/font-awesome/5.15.3) _added to index html_
[Text component from Chakra-UI](https://chakra-ui.com/docs/components/text/usage)
[Icons from Chakra-UI](https://chakra-ui.com/docs/components/icon/usage)

#### issue with the Bell Icon, initially i wanted to change the fontSize when i hover over it, but instead it does not transition
