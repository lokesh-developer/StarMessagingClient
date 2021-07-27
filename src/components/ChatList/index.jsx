import React from "react";
import {
  Flex,
  IconButton,
  useDisclosure,
  Box,
  useColorModeValue,
  Slide,
} from "@chakra-ui/react";
import { Search } from "../Search";
import { Sidebar } from "../Sidebar";
import { FriendsList } from "./FriendsList";
import { MdMenu } from "react-icons/md";

export const ChatList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("gray.100", "gray.700");

  return (
    <Slide in={true} direction="left">
      <Box
        w={["100%", "100%", "35%"]}
        h="full"
        pos="fixed"
        overflowY="scroll"
        top="0"
        left="0"
        bgColor={bg}
        style={{ scrollBehavior: "smooth" }}
      >
        <Flex p={3} justifyContent="space-around" alignItems="center">
          <IconButton
            onClick={onOpen}
            variant="ghost"
            icon={<MdMenu fontSize="30px" />}
          />
          <Search />
        </Flex>
        {/* <SavedMessages /> */}
        <FriendsList />
      </Box>
      <Sidebar Close={onClose} Open={isOpen} />
    </Slide>
  );
};
