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
  SlideFade,
} from "@chakra-ui/react";
import format from "dateformat";
import axios from "axios";
import { SocketContext } from "../../../../context/SocketContextProvider";
import { useEffect, useState, useContext } from "react";
import VisibilitySensor from "react-visibility-sensor";
import { MdDone, MdDoneAll, MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";

export const Message = ({ message, own, onDeleteClick }) => {
  const sentColor = useColorModeValue("gray.400", "gray.400");
  const [visibility, setVisibility] = useState({
    visibility: false,
    messageId: message._id,
  });
  const user = JSON.parse(localStorage.getItem("profile"));
  const socket = useContext(SocketContext);
  const getConversation = useParams();
  const [chat, currentChat] = useState([]);
  const recieverId = chat[0]?.members.find((member) => member !== user._id);
  const [messageRead, setMessageRead] = useState();

  useEffect(() => {
    setMessageRead(message.read);

    socket?.on("messageRead", (data) => {
      setMessageRead(data.messageRead);
    });
  }, [message?.read, socket]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/conversations/c/` +
            getConversation?.conversationId
        );
        currentChat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [getConversation]);

  useEffect(() => {
    if (visibility.visibility === true) {
      const readMessage = async () => {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/messages/read/${visibility?.messageId}`
        );
        setMessageRead(res.data?.read);
        socket?.emit("readMessage", {
          messageRead: message.read,
          recieverId,
        });
      };
      readMessage();
    }
  }, [recieverId, socket, visibility, message]);

  return (
    <>
      {own ? (
        <SlideFade in={true}>
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
                  {messageRead ? (
                    <Icon
                      fontSize="small"
                      color="palegoldenrod"
                      ml={2}
                      as={MdDoneAll}
                    />
                  ) : (
                    <Icon
                      fontSize="small"
                      color="palegoldenrod"
                      ml={2}
                      as={MdDone}
                    />
                  )}
                </Flex>
              </Box>
            </PopoverTrigger>
            <PopoverContent w="200px" mr={50}>
              <PopoverBody p={1}>
                {/* <Button
                  variant="ghost"
                  // onClick={BookmarkMessage}
                  isFullWidth
                  value={message._id}
                  border="none"
                >
                  Select
                </Button> */}
                <Button
                  variant="ghost"
                  isFullWidth
                  justifyContent="flex-start"
                  value={message._id}
                  onClick={onDeleteClick}
                  border="none"
                  leftIcon={<MdDelete fontSize="20px" />}
                >
                  Delete
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </SlideFade>
      ) : (
        <SlideFade in={true}>
          <VisibilitySensor
            delayedCall={false}
            scrollCheck={false}
            onChange={(isVisible) => {
              setVisibility({
                visibility: isVisible,
                messageId: message._id,
              });
            }}
          >
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
          </VisibilitySensor>
        </SlideFade>
      )}
    </>
  );
};
