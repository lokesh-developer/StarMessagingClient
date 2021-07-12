import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { ChatList, Chat } from "../components";
import { io } from "socket.io-client";

function Home() {
  const socket = useRef();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getOnlineUsers", (users) => {
      setOnlineUser(users);
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addOnlineUsers", user._id);
  }, [user._id]);
  return (
    <Box>
      <ChatList onlineUsers={onlineUser} />
      <Chat />
    </Box>
  );
}

export default Home;
