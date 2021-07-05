import { useState, useEffect } from "react";
import {
  LinkBox,
  Box,
  Text,
  LinkOverlay,
  Heading,
  Avatar,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Friend = ({ conversation, currentUser }) => {
  const lastseen = useColorModeValue("gray.600", "gray.500");
  const bg = useColorModeValue("gray.50", "whiteAlpha.50");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        localStorage.setItem(
          `conversation/friend/${friendId}`,
          JSON.stringify(res.data)
        );
        setUser(res.data);
      } catch (error) {
        const offlineConversationFriend = JSON.parse(
          localStorage.getItem(`conversation/friend/${friendId}`)
        );
        setUser(offlineConversationFriend);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <LinkBox _hover={{ bg }}>
      <LinkOverlay as={Link} to={"/chats/" + conversation._id} />
      <Flex alignItems="center" p="10px">
        <Avatar src={user?.profileUrl} />
        <Box p={3}>
          <Heading size="md">{user?.name}</Heading>
          <Text color={lastseen}>last seen recently</Text>
        </Box>
      </Flex>
    </LinkBox>
  );
};
