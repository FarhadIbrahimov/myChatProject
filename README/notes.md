$${\color{orange}ChatBox}$$
component is responsible for rendering a chat interface when a chat is selected. It relies on the selectedChat state from the ChatState context and uses the Chakra UI library for styling. The exact functionality related to fetchAgain and setFetchAgain

$${\color{orange}ChatPage}$$
component sets up the structure of the chat page, conditionally rendering components based on the presence of a user and passing necessary props to child components for managing chat-related functionality.
Inside this flex container, it conditionally renders two components:
MyChats component and ChatBox component

$${\color{purple}MyChats}$$
component is responsible for rendering the user's chat conversations, allowing them to create new group chats, and handling the fetching of chat data from an API. The actual chat data is rendered as a list of clickable chat boxes, and the selected chat is highlighted. The component also provides error handling and loading indicators.

$${\color{purple}ChatBox}$$
component: This component is also rendered if a user is present. It is passed both fetchAgain and setFetchAgain props, displaying and managing the active chat conversation.

$${\color{orange}SingleChat}$$
component serves as the UI for individual chat conversations, handling the display of messages, message sending, and updating the chat interface when a chat is selected.

$${\color{orange}GroupChatModal}$$
component provides a user-friendly way to create group chats by allowing the user to specify a chat name, search for users to include, and then submit the creation of the group chat. It handles user selection and search, displays search results, and provides feedback through toast notifications.

$${\color{orange}ProfileModal}$$
component provides a clean and user-friendly way to view a user's profile details within a modal dialog, enhancing the user experience of your application.

$${\color{orange}SideDrawer}$$
component provides essential functionality for user search, chat access, and user profile actions within a side drawer menu. It enhances the user experience of your application by allowing users to interact with various features from a convenient side menu.

$${\color{orange}ChatLogic}$$
$${\color{purple}getSender}$$ returns the name of the sender who is not the logged-in user in a conversation.
$${\color{purple}getSenderFull}$$ returns the full user object of the sender who is not the logged-in user in a conversation.
These functions are used in my application to display the sender's name or information in a chat or messaging context based on the logged-in user and the participants of the conversation.

```

```
