import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverBody,
  Icon,
} from "@chakra-ui/react";
import format from "dateformat";
// import axios from "axios";
// import { useEffect, useState } from "react";
import { MdDone, MdDoneAll } from "react-icons/md";

export const Message = ({ message, own, onDeleteClick, id }) => {
  const sentColor = useColorModeValue("gray.400", "gray.400");

  // useEffect(() => {
  //   console.log(message);
  // }, [message]);

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
              <Flex mt={2}>
                <Text color={sentColor} fontSize="x-small">
                  {format(message.createdAt, "UTC:h:MM TT")}
                </Text>
                {message.read === false ? (
                  <Icon
                    fontSize="small"
                    color="palegoldenrod"
                    ml={2}
                    as={MdDone}
                  />
                ) : (
                  <Icon
                    fontSize="small"
                    color="palegoldenrod"
                    ml={2}
                    as={MdDoneAll}
                  />
                )}
              </Flex>
            </Box>
          </PopoverTrigger>
          <PopoverContent w="200px" mr={50}>
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
            {format(message.createdAt, "UTC:h:MM TT")}
          </Text>
        </Box>
      )}
    </>
  );
};
