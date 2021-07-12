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

export const Friend = ({ conversation, onlineFriend }) => {
  const lastseen = useColorModeValue("gray.600", "gray.500");
  const bg = useColorModeValue("gray.50", "whiteAlpha.50");
  const [friendUser, setFriendUser] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const getUser = async () => {
      const friendId = conversation?.members.find((m) => m !== user._id);
      try {
        const res = await axios("/users?userId=" + friendId);
        setFriendUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [user._id, conversation?.members]);
  // console.log(onlineFriend);
  return (
    <LinkBox _hover={{ bg }}>
      <LinkOverlay as={Link} to={"/chats/" + conversation._id} />
      <Flex alignItems="center" p="10px">
        <Avatar src={friendUser?.profileUrl} />
        <Box p={3}>
          <Heading size="md">{friendUser?.name}</Heading>
          {/* { ? (
            <Text color="teal">Online</Text>
          ) : ( */}
          <Text color={lastseen}> last seen recently</Text>
          {/* )} */}
        </Box>
      </Flex>
    </LinkBox>
  );
};
