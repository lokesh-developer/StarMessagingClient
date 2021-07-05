import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import format from "dateformat";
// import axios from "axios";
// import { useEffect, useState } from "react";

export const Message = ({ message, own, onDeleteClick, id }) => {
  const sentColor = useColorModeValue("gray.400", "gray.400");

  return (
    <>
      {own ? (
        <Popover>
          <PopoverTrigger>
            <Box
              as={Flex}
              p={4}
              bg="purple.600"
              flexDir="column"
              borderLeftRadius="15px"
              borderTopRightRadius="15px"
              maxW="50%"
              style={{ clear: "both" }}
              float="right"
              m={1}
              alignItems="flex-end"
            >
              <Text style={{ wordBreak: "break-all" }} color="white">
                {message.text}
              </Text>
              <Text color={sentColor} fontSize="x-small">
                {format(message.sentAt, "UTC:h:MM TT")}
              </Text>
            </Box>
          </PopoverTrigger>
          <PopoverContent w="200px" mr={50}>
            <PopoverHeader>Options</PopoverHeader>
            <PopoverBody p={0}>
              {/* <Button
                variant="ghost"
                onClick={BookmarkMessage}
                isFullWidth
                value={message._id}
                border="none"
              >
                Bookmark
              </Button> */}
              <Button
                variant="ghost"
                isFullWidth
                value={message._id}
                onClick={onDeleteClick}
                border="none"
              >
                Delete
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Box
          as={Flex}
          p={3}
          bg="blue.600"
          flexDir="column"
          borderRightRadius="15px"
          borderTopLeftRadius="15px"
          maxW="50%"
          float="left"
          style={{ clear: "both" }}
          m={2}
          alignItems="flex-start"
        >
          <Text style={{ wordBreak: "break-all" }} color="white">
            {message.text}
          </Text>
          <Text color={sentColor} fontSize="x-small">
            {format(message.sentAt, "UTC:h:MM TT")}
          </Text>
        </Box>
      )}
    </>
  );
};
