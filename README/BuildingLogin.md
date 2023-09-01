# Building Login functionality

## Login Functionality

If you've already completed the Sign Up process, you'll find that the Login functionality is quite similar. In this section, we'll explore the `submitHandler` function, which is responsible for handling the submission of a login form.

## The `submitHandler` Function

created submitHandler function

The `submitHandler` function performs the following steps:

```js
const submitHandler = async () => {
  setLoading(true); // Set loading state to true to show loading spinner

  // Check if email or password is missing
  if (!email || !password) {
    toast({
      title: "Please Fill All The Fields!", // Display a warning toast message
      status: "warning",
      duration: 5000, // Display the message for 5 seconds
      isClosable: true, // Allow the user to close the toast message
      position: "bottom", // Display the toast at the bottom of the screen
    });
    setLoading(false); // Set loading state back to false
    return; // Exit the function early
  }

  try {
    const config = {
      headers: {
        "Content-Type": "application/json", // Set the content type for the request
      },
    };

    // Send a POST request to the "/api/users/login" endpoint with email and password
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    toast({
      title: "Login Successful!", // Display a success toast message
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });

    // Store user information in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));

    setLoading(false); // Set loading state back to false
    history.push("/chats"); // Redirect the user to the "/chats" page
  } catch (error) {
    // Handle errors
    toast({
      title: "Error Occurred!", // Display an error toast message with error description
      description: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });

    setLoading(false); // Set loading state back to false
  }
};
```

1. **Set Loading State**: It starts by setting the loading state to true, indicating that a loading spinner should be displayed.

2. **Validation Check**: Next, it checks whether the email and password fields are filled. If either of them is missing, it displays a warning toast message. This message prompts the user to fill in all the required fields. The toast message is shown for 5 seconds and can be closed by the user. It is displayed at the bottom of the screen.

3. **HTTP Request Configuration**: If both the email and password are provided, the function prepares an HTTP request configuration object. Specifically, it sets the content type for the request to JSON.

4. **Login Request**: The function sends a POST request to the `/api/users/login` endpoint on the server. This request includes the user's email and password. The server will validate these credentials.

5. **Success Toast**: If the login is successful, the function displays a success toast message. This message indicates that the login was successful and provides positive feedback to the user. The success toast is shown for 5 seconds at the bottom of the screen.

6. **Local Storage**: The user's information, such as their user ID and authentication token, is stored in local storage for future use.

7. **Redirect**: After successful login, the function redirects the user to the `/chats` page, allowing them to access the main chat interface.

8. **Error Handling**: If there's an error during the login process, the function displays an error toast message. This message informs the user that an error occurred and provides details about the error, such as an error description. The error toast is also shown for 5 seconds and can be closed by the user.

## Usage of Toast

[Toast documentation](https://chakra-ui.com/docs/components/toast/usage)

In this code, we use the `toast` object to display notification messages to the user. These notifications, often referred to as "toasts," are small pop-up messages that appear briefly on the user's screen to provide information or feedback about an action or event. They are designed to be non-intrusive and disappear after a short period.

The `toast` object used in this code is derived from the Chakra UI library, specifically the `useToast` hook. Chakra UI is a popular React UI component library that offers a range of customizable and accessible components, including notifications (toasts).

Here's how the `useToast` hook is imported at the beginning of this code:

```javascript
import { useToast } from "@chakra-ui/react";
```

This line allows us to create and display toast messages in our application. The useToast hook provides a straightforward API for creating and customizing these notification messages. You can configure aspects such as the title, description, duration, and position of the toast.

In this code, I use the toast object to create and display various types of toasts, including success, warning, and error messages. These toasts provide valuable feedback to users during actions like form submission and login attempts.

Initialize the toast Object: Create an instance of the useToast hook by calling it. This will give you access to the toast object.

```js
const toast = useToast();
```

Here's an example of creating a success toast:

```js
toast({
  title: "Login Successful!", // Title of the toast
  status: "success", // Status (success, warning, error, info)
  duration: 5000, // Duration (in milliseconds)
  isClosable: true, // Allow the user to close the toast
  position: "bottom", // Position on the screen (e.g., "bottom-right")
});
```

You can also create other types of toasts (e.g., warning, error, info) by changing the status property in the options object.

```js
toast({
  title: "Warning Message",
  status: "warning",
  // ... other options
});
```

## Using the `history` Object for Navigation

[`history` Object documentation](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

In a React application, the `history` object is a fundamental tool for handling navigation and routing. It allows you to programmatically navigate between different views or pages in your application. The `history` object is typically provided by a routing library like React Router.

### Importing `useHistory`

```js
import { useHistory } from "react-router-dom";
```

### Initializing the `history` Object

```js
const history = useHistory();
```

### Programmatic Navigation

You can use the history object to navigate to different routes or pages in your application. It provides the following methods for navigation:

Example:

```js
// Navigates to the "/chats" route
history.push("/chats");
```

#### `replace(path, [state])`

Replaces the current entry in the history stack with the specified path. This is similar to push but doesn't add a new entry to the stack; it replaces the current one.

Example:

```js
// Replaces the current route with the "/profile" route
history.replace("/profile");
```

#### `goBack()`

Navigates to the previous entry in the history stack, effectively simulating a "back" button press in the browser.

Example:

```js
// Navigates back to the previous route
history.goBack();
```

### Accessing Location Information

The history object also provides information about the current location (URL) and allows you to listen for changes to the location.

#### `history.location`

Provides information about the current location, including pathname, search, and state.

Example:

```js
console.log(history.location.pathname); // Current pathname
```

#### `history.listen(callback)`

Allows you to listen for changes to the location. The callback function is called whenever the location changes, and it receives the new location object as an argument.

Example:

```js
history.listen((location) => {
  console.log("Location changed:", location.pathname);
});
```

_By using the history object, you can control the navigation flow of your React application and respond to user interactions or events by programmatically navigating between different routes or views. This is particularly useful for building single-page applications (SPAs) with React._
