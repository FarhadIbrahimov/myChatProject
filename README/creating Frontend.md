# Getting Started with Vite, Chakra UI, and React Router

Follow these steps to set up your project with Vite, Chakra UI, and React Router:

1. **Install Vite**: To install Vite, follow the instructions on the [Vite website](https://vitejs.dev/guide/).

2. **Install Chakra UI**: Install Chakra UI by following the instructions on the [Chakra UI website](https://chakra-ui.com/getting-started). Chakra UI is a component library that provides accessible and modular components for React applications.

   > Chakra UI is a simple, modular, and accessible component library that gives you the building blocks you need to build your React applications. [Chakra UI](https://chakra-ui.com/)

3. **Install React Router**: Install the `react-router-dom` package using the following command:

npm install react-router-dom

4. **Import BrowserRouter**: In your `App.jsx` (or `App.js`) file, import `BrowserRouter` from `react-router-dom`. This component provides the routing functionality for your application.

5. **Use React Router with `exact`**: In your `App.jsx` file, set up your routes using `Route` components. Utilize the `exact` prop to control how routes match URL paths. This helps prevent unintended matches due to similar path prefixes.

Here's an example of how you can set up routes with `exact`:

```jsx
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={HomePage} exact />
        <Route path="/chats" component={ChatPage} />
      </Router>
    </div>
  );
}

export default App;
```

By using the exact prop on the home page route, you ensure that it matches only when the URL path is exactly /. This prevents unexpected behavior where multiple components could render due to similar path prefixes.

6. added proxy to `vite.config.js` file to connect to backend using axios that was installed to client folder by entering command `npm i axios`
