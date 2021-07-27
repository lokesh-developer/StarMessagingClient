import React from "react";
import { Box } from "@chakra-ui/react";
import { ChatList, Chat } from "../components";

function Home() {
  return (
    <Box>
      <ChatList />
      <Chat />
    </Box>
  );
}

export default Home;
