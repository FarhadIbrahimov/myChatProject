import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/chat");
        const { data } = response;
        setChats(data);
        console.log(data);
      } catch (error) {
        console.log();
        console.log("Error fetching chats: ", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {chats.map((chat) => (
          <li key={chat._id}>{chat.chatName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatPage;
