import React, { useState, useEffect } from "react";
import { Box, Tag, Flex, SlideFade, Divider, useToast } from "@chakra-ui/react";
import { ChatHeader } from "./ChatHeader";
import { useParams } from "react-router";
import { ChatBox } from "./ChatBox";
import axios from "axios";

export const Chat = () => {
  const [currentChat, setCurrenChat] = useState(null);
  const getConversation = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [anonymous, setAnonymous] = useState();
  const toast = useToast();

  useEffect(() => {
    setCurrenChat(getConversation.conversationId);
    if (getConversation?.conversationId !== undefined) {
      const getFriends = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/conversations/c/` +
              getConversation?.conversationId
          );
          setAnonymous(
            res.data[0].members
              .map((m) => m === user._id)
              .find((t) => t === true)
          );
        } catch (error) {
          toast({
            position: "top-left",
            title: "Server error",
            description: "Some error while connecting to server.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      };
      getFriends();
    }
  }, [getConversation.conversationId, user._id, toast]);

  return (
    <>
      <Divider orientation="vertical" />
      {anonymous === undefined ? (
        <>
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
            <Tag size="md">Select a chat to start messaging.</Tag>
          </Box>
        </>
      ) : (
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
        </>
      )}
    </>
  );
};
