import React, { useState, useEffect } from "react";
import { Box, Tag, Flex, SlideFade, Divider } from "@chakra-ui/react";
import { ChatHeader } from "./ChatHeader";
import { useParams } from "react-router";
import { ChatBox } from "./ChatBox";

export const Chat = () => {
  const [currentChat, setCurrenChat] = useState(null);
  const getConversation = useParams();

  useEffect(() => {
    setCurrenChat(getConversation.conversationId);
  }, [getConversation.conversationId]);

  return (
    <>
      {currentChat ? (
        <Box w={["100%", "100%", "65%"]}>
          <Box
            pos="fixed"
            top="0"
            ml={["0%", "0%", "35%"]}
            w={["100%", "100%", "65%"]}
            alignItems="center"
            justifyContent="center"
            h="full"
          >
            <SlideFade
              reverse={true}
              unmountOnExit={true}
              offsetX={40}
              in={true}
            >
              <ChatHeader />
            </SlideFade>
            <ChatBox />
          </Box>
        </Box>
      ) : (
        <Box
          as={Flex}
          flexDir="column"
          pos="fixed"
          top="0"
          ml="35%"
          d={["none", "none", "flex"]}
          w="65%"
          alignItems="center"
          justifyContent="center"
          h="full"
        >
          <Tag size="md">Select a chat to start messaging...</Tag>
        </Box>
      )}

      <Divider orientation="vertical" />
    </>
  );
};
