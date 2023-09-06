import { ChatState } from "../Context/ChatProvider";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const MyChats = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/chat`, config);

      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return <div>My Chats</div>;
};

export default MyChats;
