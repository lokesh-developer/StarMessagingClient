import React from "react";
import { Box, useToast, useDisclosure } from "@chakra-ui/react";
import { ChatList, Chat, SettingModal } from "../components";
import { IsUpdateAvailable } from "../lib/hooks/IsUpdateAvailable";

function Home() {
  const updateAvail = IsUpdateAvailable();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (updateAvail) {
    toast({
      title: "Hello my friend!",
      description:
        "New Update is available Please go to settings to update the app.",
      onCloseComplete: () => {
        onOpen();
      },
      status: "info",
      variant: "subtle",
      position: "top-left",
      duration: null,
      isClosable: true,
    });
  }
  return (
    <>
      <Box>
        <ChatList />
        <Chat />
      </Box>
      <SettingModal Open={isOpen} Close={onClose} />
    </>
  );
}

export default Home;
