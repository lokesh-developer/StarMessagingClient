import React from "react";
import {
  Avatar,
  Box,
  Text,
  Flex,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { MdBrightnessHigh, MdBrightness2 } from "react-icons/md";

export const SideBarProfile = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Box
      p={5}
      h="150px"
      as={Flex}
      flexDir="column"
      justifyContent="space-between"
      backgroundImage="url('/chat-bg.jpg')"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      {user ? (
        <>
          <Avatar alt={user.profileUrl} src={user.profileUrl} />
          <Box as={Flex} justifyContent="space-between">
            <Box color="whiteAlpha.900">
              <Text>{user.name}</Text>
              <Text fontSize="sm">{user.email}</Text>
            </Box>
            <IconButton
              color="whiteAlpha"
              icon={
                colorMode === "light" ? (
                  <MdBrightness2 fontSize="28px" />
                ) : (
                  <MdBrightnessHigh fontSize="28px" />
                )
              }
              borderRadius="full"
              onClick={toggleColorMode}
            />
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};
