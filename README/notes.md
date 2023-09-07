- <span style="color: orange;">**ChatBox component**</span> is responsible for rendering a chat interface when a chat is selected. It relies on the selectedChat state from the ChatState context and uses the Chakra UI library for styling. The exact functionality related to `fetchAgain` and `setFetchAgain`.

- <span style="color: orange;">**ChatPage component**</span> sets up the structure of the chat page, conditionally rendering components based on the presence of a user and passing necessary props to child components for managing chat-related functionality.

  - Inside this flex container, it conditionally renders two components:

    - <span style="color: orange;">**MyChats component**</span>: This component is rendered if a user is present. It is passed the `fetchAgain` prop, displaying and managing the user's chat list.

    - <span style="color: orange;">**ChatBox component**</span>: This component is also rendered if a user is present. It is passed both `fetchAgain` and `setFetchAgain` props, displaying and managing the active chat conversation.

- <span style="color: orange;">**SingleChat component**</span> serves as the UI for individual chat conversations, handling the display of messages, message sending, and updating the chat interface when a chat is selected.

- <span style="color: orange;">**GroupChatModal component**</span> provides a user-friendly way to create group chats by allowing the user to specify a chat name, search for users to include, and then submit the creation of the group chat. It handles user selection and search, displays search results, and provides feedback through toast notifications.

- <span style="color: orange;">**ProfileModal component**</span> provides a clean and user-friendly way to view a user's profile details within a modal dialog, enhancing the user experience of your application.

- <span style="color: orange;">**SideDrawer component**</span> provides essential functionality for user search, chat access, and user profile actions within a side drawer menu. It enhances the user experience of your application by allowing users to interact with various features from a convenient side menu.

- <span style="color: orange;">**ChatLogic**</span>
  - `getSender` returns the name of the sender who is not the logged-in user in a conversation.
  - `getSenderFull` returns the full user object of the sender who is not the logged-in user in a conversation.

These functions are used in my application to display the sender's name or information in a chat or messaging context based on the logged-in user and the participants of the conversation.
