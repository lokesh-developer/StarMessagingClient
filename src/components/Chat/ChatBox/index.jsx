import { useRef, useEffect, useState } from "react";
import {
  Box,
  Input,
  IconButton,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { Message } from "./Message";
import { MdSend } from "react-icons/md";
import { useParams } from "react-router";
import axios from "axios";
import { io } from "socket.io-client";
import { Loader } from "../../Loader";
import { toDate } from "date-fns-tz";
import { format } from "date-fns";

export const ChatBox = () => {
  const getConversation = useParams();
  const [messages, setMessages] = useState([]);
  const bg = useColorModeValue("gray.100", "gray.700");
  const [newMessage, setNewMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const [chat, currentChat] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState({});
  const socket = useRef();
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();
  const send = useRef();
  const isDisabled = newMessage === "" ? true : false;
  const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss", {
    timeZone: "Asia/Kolkata",
  });
  const date = toDate(currentDate, { timeZone: "UTC" });

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("recieveMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        sentAt: data.sentAt,
      });
    });
    socket.current.on("messageDeleted", (data) => {
      setMessages(data.previosMessages);
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight);
  }, [messages]);

  useEffect(() => {
    socket.current.emit("addUsers", user._id);
    socket.current.on("getUsers", (users) => {});
  }, [user]);

  useEffect(() => {
    arrivalMessage &&
      chat[0]?.members.includes(arrivalMessage?.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, chat]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          "/conversations/c/" + getConversation?.conversationId
        );
        currentChat(res.data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();

    const getMessages = async () => {
      try {
        const res = await axios.get(
          "/messages/" + getConversation?.conversationId
        );
        localStorage.setItem(
          `messages/${getConversation?.conversationId}`,
          JSON.stringify(res.data)
        );
        setMessages(res.data);
        setLoading(true);
      } catch (error) {
        const offlineMessages = JSON.parse(
          localStorage.getItem(`messages/${getConversation?.conversationId}`)
        );
        setMessages(offlineMessages);
      }
    };
    getMessages();
  }, [getConversation.conversationId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      sentAt: date,
      conversationId: getConversation?.conversationId,
    };
    const recieverId = chat[0]?.members.find((member) => member !== user._id);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      recieverId: recieverId,
      text: newMessage,
      sentAt: date,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteMessage = async (e) => {
    const messageDeleting = e.target.value;
    const recieverId = chat[0]?.members.find((member) => member !== user._id);

    try {
      const res = await axios.post("/messages/delete/" + messageDeleting);
      setMessages(messages.filter((m) => m._id !== res.data._id));
      socket.current.emit("deleteMessage", {
        previosMessages: [...messages.filter((m) => m._id !== res.data._id)],
        recieverId: recieverId,
        messageId: messageDeleting,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        backgroundImage="url('/chat-bg.jpg')"
        backgroundSize="cover"
        h="-webkit-fill-available"
        mt="71px"
        w={["100%", "100%", "100%"]}
        zIndex="-1"
        sx={{ marginBottom: "70px", scrollBehavior: "smooth" }}
        overflowY="auto"
        ref={scrollRef}
      >
        {messages.map((m, mid) => (
          <Message
            key={mid}
            message={m}
            own={m.sender === user._id}
            onDeleteClick={DeleteMessage}
          />
        ))}
        {loading ? (
          <>
            <form>
              <Flex
                pos="fixed"
                p={4}
                bg={bg}
                w={["100%", "100%", "65%"]}
                bottom="0"
              >
                <Input
                  ml={3}
                  w="full"
                  variant="unstyled"
                  placeholder="Write a message..."
                  type="text"
                  name="chat"
                  minH="auto"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  p={0}
                  isRequired
                  resize="none"
                  fontSize="md"
                  id="chat"
                />
                <IconButton
                  onClick={sendMessage}
                  ml={3}
                  type="submit"
                  borderRadius="full"
                  variant="ghost"
                  isDisabled={isDisabled}
                  ref={send}
                  icon={<MdSend fontSize="27px" />}
                />
              </Flex>
            </form>
          </>
        ) : (
          <Loader />
        )}
      </Box>
    </>
  );
};
