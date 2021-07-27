import { useState, useEffect } from "react";
import {
  LinkBox,
  Box,
  LinkOverlay,
  Heading,
  Avatar,
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

  useEffect(() => {
    const getUser = async () => {
      const friendId = conversation?.members.find((m) => m !== user._id);
      setFriendId(friendId);

      try {
        const res = await axios("/users?userId=" + friendId);
        setFriendUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [user._id, conversation]);

  return (
    <LinkBox _hover={{ bg }}>
      <LinkOverlay as={Link} to={"/chats/conversations/" + conversation._id} />
      <Flex alignItems="center" p="10px">
        <Avatar src={friendUser?.profileUrl} />
        <Box p={3}>
          <Heading size="md">{friendUser?.name}</Heading>
          <OnlineUser friendId={friendId} />
        </Box>
      </Flex>
    </LinkBox>
  );
};
