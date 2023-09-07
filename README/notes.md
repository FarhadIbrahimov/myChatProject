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

$${\color{orange}UpdateGroupChatModal}$$
is a versatile component that allows users to manage group chats by renaming them, adding or removing users, and leaving the group. It also provides a user-friendly interface for these operations with error handling and loading indicators for a smoother user experience.

$${\color{orange}UserListItem}$$
component is a reusable component that is used to display user information within a list. It provides a clickable interface with Chakra UI styling and takes advantage of the Avatar component for displaying user avatars. The `handleFunction` prop allows you to specify a function to be executed when a user clicks on a list item, making it versatile for different use cases in a React application.

$${\color{orange}UserBadgeItem}$$
component is designed to represent a user with their name and an optional "Admin" indicator. It is styled as a badge and used in various contexts, such as displaying a list of users with their roles or permissions. The handleFunction prop allows you to specify a function to be executed when a user clicks on the badge, making it versatile for different use cases in a React application.

$${\color{orange}ChatProvider}$$
this code sets up a context provider for managing chat-related state, including user information, selected chats, and chat conversations. The context provider ensures that this state is accessible to any component within its descendant tree that wants to consume it using the ChatState function. This pattern is commonly used in React applications to manage and share global state across different components.

$${\color{purple}ChatContext}$$
_A new context named ChatContext is created using the createContext function. This context will be used to store and share chat-related state across different parts of the application._

$${\color{purple}ChatContext.Provider}$$
This component wraps its children with the ChatContext.Provider. It provides the chat-related state and functions to its descendants through the context's value prop.

$${\color{purple}ChatState Function}$$
This function is used to consume the ChatContext and retrieve the chat-related state and functions. It uses the useContext hook to access the context and return its value.

$${\color{orange}ChatLogic}$$
$${\color{purple}getSender}$$ returns the name of the sender who is not the logged-in user in a conversation.
$${\color{purple}getSenderFull}$$ returns the full user object of the sender who is not the logged-in user in a conversation.
These functions are used in my application to display the sender's name or information in a chat or messaging context based on the logged-in user and the participants of the conversation.
