import React from "react";
import {
  Flex,
  IconButton,
  useDisclosure,
  Box,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import loadable from "@loadable/component";
import { MdMenu } from "react-icons/md";
import { FriendsList } from "./FriendsList";

export const ChatList = () => {
  const Search = loadable(() => import("../Search").then((mod) => mod.Search));
  const Sidebar = loadable(() =>
    import("../Sidebar").then((mod) => mod.Sidebar)
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("gray.100", "gray.700");

  return (
    <>
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
        <Divider
          orientation="vertical"
          pos="fixed"
          left="34.9%"
          d={["none", "none", "block"]}
          top="0"
          zIndex="99999"
        />
      </Box>
      <Sidebar Close={onClose} Open={isOpen} />
    </>
  );
};
