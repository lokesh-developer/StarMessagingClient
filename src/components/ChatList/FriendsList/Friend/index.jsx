import { useState, useEffect } from "react";
import {
  LinkBox,
  Box,
  LinkOverlay,
  Heading,
  Avatar,
  Tag,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { OnlineUser } from "../../../OnlineUser";

export const Friend = ({ conversation }) => {
  const bg = useColorModeValue("gray.50", "whiteAlpha.50");
  const [friendUser, setFriendUser] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [friendId, setFriendId] = useState();
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const friendId = conversation?.members.find((m) => m !== user._id);
      setFriendId(friendId);
      if (friendId !== undefined) {
        try {
          const res = await axios("/users?userId=" + friendId);
          setFriendUser(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getUser();
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + conversation?._id);
        localStorage.setItem(
          `messages/unread/${conversation?._id}`,
          JSON.stringify(res.data.filter((m) => m.read === false).length)
        );
        setUnreadMessages(res.data.filter((m) => m.read === false).length);
        console.log();
      } catch (error) {
        const offlineMessages = JSON.parse(
          localStorage.getItem(`messages/unread/${conversation?._id}`)
        );
        setUnreadMessages(offlineMessages);
      }
    };
    getMessages();
  }, [user._id, conversation]);

  return (
    <>
      <LinkBox _hover={{ bg }}>
        <LinkOverlay
          as={Link}
          to={"/chats/conversations/" + conversation._id}
        />
        <Flex alignItems="center" justifyContent="space-between" p="10px">
          <Flex alignItems="center">
            <Avatar src={friendUser?.profileUrl} />
            <Box p={3}>
              <Heading size="md">{friendUser?.name}</Heading>
              <OnlineUser friendId={friendId} />
            </Box>
          </Flex>
          <Tag colorScheme="telegram" borderRadius="full">
            {unreadMessages}
          </Tag>
        </Flex>
      </LinkBox>
    </>
  );
};
